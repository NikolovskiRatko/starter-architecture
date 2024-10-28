#!/bin/bash
set -e

# Check if storage link exists, if not, create it
if [ ! -L "/var/www/html/starter/public/storage" ]; then
    php artisan storage:link
fi

# Start the main process
exec "$@"
