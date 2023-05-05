#!/usr/bin/env bash

# Use this script on your WSL2 (only tested on Ubuntu-20.04) instance so that you may use Cypress on it

# First, ensure that dbus is installed and at the latest version
sudo apt-get update && sudo apt-get install -y dbus

# Now configure the daemon
mkdir -p /var/run/dbus
dbus-daemon --config-file=/usr/share/dbus-1/system.conf --print-address

# NOTE: I received the following output, but cypress still works
# dbus[9606]: Unknown username "whoopsie" in message bus configuration file
# unix:path=/var/run/dbus/system_bus_socket,guid=fbc969c8ebb0cf0cfff9fc746432af35
