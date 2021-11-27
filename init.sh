#!/bin/sh

rm -rf dist
rm -rf build
mkdir -p dist
mkdir -p build/docs/api
cp -f docs/mkdocs.yml build/
touch docs/mkdocs.yml
