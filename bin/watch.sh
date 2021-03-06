#!/usr/bin/env bash

# Clean
rm nohup.out 2>/dev/null
rm -rf public
mkdir -p public/assets/styles
mkdir -p public/assets/scripts

# Compile Pug sources
nohup pug src/templates -o public -w &
pug_pid=$!
trap "kill -15 $pug_pid &>/dev/null" 2 15

# Compile Stylus sources
nohup stylus src/styles/app.styl -o public/assets/styles -m -w &
stylus_pid=$!
trap "kill -15 $stylus_pid &>/dev/null" 2 15

# Compile TypeScript sources
nohup watchify -d src/scripts/main.ts -p [ tsify ] -o public/assets/scripts/app.js &
watchify_pid=$!
trap "kill -15 $watchify_pid $>/dev/null" 2 15

# Run Server
nohup browser-sync start --config bs-config.js &
browserSync_pid=$!
trap "kill -15 $browserSync_pid &>/dev/null" 2 15

tail -f nohup.out
