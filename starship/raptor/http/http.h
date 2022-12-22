#ifndef STARSHIP_RAPTOR_HTTP_H_
#define STARSHIP_RAPTOR_HTTP_H_

#include <future> // std::future
#include <string> // std::string

namespace starship::raptor::http {

#define STARSHIP_RAPTOR_HTTP_METHODS(V)                                        \
  V(GET)                                                                       \
  V(HEAD)                                                                      \
  V(POST) V(PUT) V(DELETE) V(CONNECT) V(OPTIONS) V(TRACE) V(PATCH)

enum class Method {
#define V(HTTP_METHOD) HTTP_METHOD,

  STARSHIP_RAPTOR_HTTP_METHODS(V)
#undef V
};

struct Response {
  std::string body;
  uint16_t status;
};

auto request(const std::string &url, Method method = Method::GET)
    -> std::future<Response>;

} // namespace starship::raptor::http

#endif
