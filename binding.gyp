{
  "targets": [
    {
      "target_name": "_starship",
      "sources": [ "starship/starship.cc", "starship/raptor/http/http_macos.mm" ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          "-std=c++20",
        ]
      }
    }
  ]
}
