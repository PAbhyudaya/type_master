#!/bin/bash
# Stop Apache web server before deployment
sudo systemctl stop apache2 || true
