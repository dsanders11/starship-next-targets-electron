#include <node.h>

#include "raptor/http/http.h"

static void HttpRequest(const v8::FunctionCallbackInfo<v8::Value> &args) {
  v8::Isolate *isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();

  // Create promise resolver and return associated promise from this function
  v8::Local<v8::Promise::Resolver> resolver =
      v8::Promise::Resolver::New(context).ToLocalChecked();
  args.GetReturnValue().Set(resolver->GetPromise());

  // This blocks the thread waiting
  v8::String::Utf8Value url(isolate, args[0]);
  starship::raptor::http::Response response =
      starship::raptor::http::request(*url).get();

  v8::Maybe<bool> result = resolver->Resolve(
      context,
      v8::String::NewFromUtf8(isolate, response.body.c_str()).ToLocalChecked());
}

// Initialize this addon to be context-aware.
NODE_MODULE_INIT(/* exports, module, context */) {
  v8::Isolate *isolate = context->GetIsolate();

  exports
      ->Set(context,
            v8::String::NewFromUtf8(isolate, "http_request").ToLocalChecked(),
            v8::FunctionTemplate::New(isolate, HttpRequest)
                ->GetFunction(context)
                .ToLocalChecked())
      .FromJust();
}
