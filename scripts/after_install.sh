#!/bin/bash
# Set correct permissions on web files
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
