#!/bin/bash

# ============================================================
# Deploy Firebase Parent Project (macOS/Linux)
# Usage:
#     ./deploy-parent.sh <ten_project>
# Example:
#     ./deploy-parent.sh Amenosa
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if fnm is installed and use Node 22
if command -v fnm &> /dev/null; then
    eval "$(fnm env --use-on-cd)"
    fnm use 22
elif command -v nvm &> /dev/null; then
    # Fallback to nvm if fnm not available
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use 22
else
    echo "ERROR: fnm or nvm not found. Please install Node.js version manager."
    exit 1
fi

# Run Node.js deploy script
node "$SCRIPT_DIR/deploy-parent.js" "$@"

exit $?
