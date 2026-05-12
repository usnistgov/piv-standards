#!/usr/bin/env bash
set -euo pipefail

# Install Bun
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

# Clone and build mystmd fork
if [ -d mystmd/.git ]; then
  cd mystmd && git fetch origin main && git reset --hard origin/main && cd ..
else
  rm -rf mystmd
  git clone --depth 1 --branch main https://github.com/regenscheid/mystmd.git
fi
cd mystmd
bun install
bun run build
cd ..

# Create myst CLI wrapper in a local bin directory
mkdir -p "$HOME/.local/bin"
MYST_CJS="$(pwd)/mystmd/packages/mystmd/dist/myst.cjs"
printf '#!/bin/sh\nnode "%s" "$@"\n' "$MYST_CJS" > "$HOME/.local/bin/myst"
chmod +x "$HOME/.local/bin/myst"
export PATH="$HOME/.local/bin:$PATH"
myst --version

# Install project dependencies
npm ci

# Clear cached templates
rm -rf _build/templates

# Build the site
export BASE_URL="${BASE_URL:-}"
HOST=0.0.0.0 node "$MYST_CJS" start --headless --keep-host &
MYST_PID=$!
sleep 5

echo "=== Starting HTML build ==="
CONTENT_CDN="http://localhost:3100" HOST=127.0.0.1 node "$MYST_CJS" build --html
echo "=== HTML build complete ==="

# Kill the content server and all its children so the build exits cleanly
kill -9 $MYST_PID 2>/dev/null || true
pkill -9 -P $MYST_PID 2>/dev/null || true
echo "=== Build script done ==="
