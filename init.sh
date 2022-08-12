#!/bin/sh

rm -rf dist
rm -rf build
docker run --rm --platform linux/amd64 -v $(pwd):/workspace -w /workspace --entrypoint make customcommander/webdev build/mkdocs.yml
