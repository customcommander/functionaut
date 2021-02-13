# Project Blueprint

A template for managing the development lifecycle of a Node.js package.

## Why?

There are many things to think about and set up properly before you can start writing and publishing code. This template intends to give you enough of head start as starting from scratch always slows you down. If you don't know how or where to start or fear ["analysis paralysis"](https://en.wikipedia.org/wiki/Analysis_paralysis), this template could provide a handy escape hatch.

## What's in the box?

This template is entirely based on my own (insignificant) opinions on how to achieve a steady, healthy and sustainable development lifecycle. Some of my decisions are documented in [architecture decision records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions). After you generate a repository from this template you are free to make _any_ changes you like but you'll be on your own.

### A development environment 100% dockerized

The main development container provides: Node.js 14, GNU Make, Git, JQ, Google Closure Compiler and ADR Tools. For an even better developer experience there is a `.devcontainer.json` file to spin up the development environment with the [VS Code Remote - Containers](https://code.visualstudio.com/docs/remote/containers) extension.

### Building

Make is the build tool. We use the Google Closure Compiler for compiling and bundling your Node.js library. A browser bundle is automatically generated too. [Tape](https://github.com/substack/tape) is used for testing.

### Release

On every push to your main branch (either `main` or `master`) a GitHub workflow will automatically publish a new version to both NPM and GitHub. The [semantic-release](https://github.com/semantic-release/semantic-release) tool automatically works out the next version by analysing your commit messages. A CHANGELOG file is automatically generated.

### Pull Request

A GitHub workflow runs all your tests against all pull requests.

### Documentation

We use [Slate](https://github.com/slatedocs/slate) to generate API documentation from your source files. A GitHub workflow automatically deploys to `gh-pages` on every push to your main branch. (Example https://customcommander.github.io/project-blueprint/)

### Architecture Decision Records (ADR)

Keeping a record of your architecture decisions is as important as writing and maintaining code. The development environment comes with [ADR Tools](https://github.com/npryce/adr-tools).