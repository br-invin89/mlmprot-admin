#!/bin/bash
cd /var/www/html/admin
yarn run build
yarn cache clean
cp /var/www/html/.htaccess /var/www/html/admin/dist
