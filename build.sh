export npm_config_target=18.3.15
export npm_config_arch=arm64
export npm_config_target_arch=arm64
export npm_config_disturl=https://electronjs.org/headers
export npm_config_runtime=electron
export npm_config_build_from_source=true
export npm_config_debug=true

# Cleanup
rm -rf build
rm -rf dist

# Build
npm install

# Starship code
esbuild --external:electron --bundle starship/preload.ts --outfile=dist/preload.js
cp build/Debug/_starship.node dist/

# User code
esbuild --external:electron --external:./_starship --platform=node --bundle main.ts --outfile=dist/main.js
esbuild --external:electron --bundle renderer.ts --outfile=dist/renderer.js
cp index.html dist/
