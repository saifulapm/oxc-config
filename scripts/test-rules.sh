#!/usr/bin/env bash
# Run the vendored anti-slop rule tests (RuleTester throws on failure).
set -euo pipefail
cd "$(dirname "$0")/.."
for file in src/plugins/anti-slop/rules/*.test.ts; do
  echo "· $file"
  node "$file"
done
echo "all rule tests passed"
