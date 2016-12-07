#!/usr/local/bin/dumb-init /bin/bash

set -e

# Disabling nginx daemon mode
export KONG_NGINX_DAEMON="off"

[ -z "$KONG_NGINX_DAEMON" ] && export KONG_NGINX_DAEMON="off"

# Wait for database availability
if [[ $1 == 'kong' ]]; then
  wait-for-it -t 30 ${KONG_PG_HOST}:5432
fi

exec "$@"
