#!/bin/sh

rm -rf dist
rm -rf build
docker run --rm -v $(pwd):/workspace -w /workspace --entrypoint make customcommander/webdev build/mkdocs.yml
