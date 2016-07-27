#!/bin/bash

set -e -o pipefail

# Merge default config with supplied environment
conf-merge.js /etc/kong/kong.yml

# Wait for database availability
conf-database-resource.js /etc/kong/kong.yml | wait-on-resource.js

exec "$@"
