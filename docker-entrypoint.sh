#!/bin/bash

set -e -o pipefail

# Merge default config with supplied environment
conf-merge.js /etc/kong/kong.yml

# Wait for database availability
if [[ $1 == 'kong' ]]; then
  conf-database-resource.js /etc/kong/kong.yml | wait-on-resource.js
fi

exec "$@"
