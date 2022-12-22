#include "http.h"

#import <Foundation/Foundation.h>

#include <future> // std::promise, std::future
#include <memory> // std::shared_ptr, std::make_shared
#include <string> // std::string

namespace starship::raptor::http {

auto request(const std::string &url, Method method) -> std::future<Response> {
  std::shared_ptr<std::promise<Response>> promise =
      std::make_shared<std::promise<Response>>();

  std::future<Response> f = promise->get_future();

  NSString *targetUrl =
      [NSString stringWithCString:url.c_str()
                         encoding:[NSString defaultCStringEncoding]];
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
  switch (method) {
#define V(HTTP_METHOD)                                                         \
  case Method::HTTP_METHOD:                                                    \
    [request setHTTPMethod:@ #HTTP_METHOD];                                    \
    break;

    STARSHIP_RAPTOR_HTTP_METHODS(V)
#undef V
  }
  [request setURL:[NSURL URLWithString:targetUrl]];

  [[[NSURLSession sharedSession]
      dataTaskWithRequest:request
        completionHandler:[promise, url](NSData *_Nullable data,
                                    NSURLResponse *_Nullable response,
                                    NSError *_Nullable) {
          NSString *responseString =
              [[NSString alloc] initWithData:data
                                    encoding:NSISOLatin1StringEncoding];
          NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
          promise->set_value(
              {std::string([responseString UTF8String]),
               static_cast<uint16_t>([httpResponse statusCode])});
        }] resume];

  return f;
}

} // namespace starship::raptor::http
