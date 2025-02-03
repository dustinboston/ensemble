#!/bin/bash

rm -rf docs
deno doc --html --name='Ensemble' --output=./docs ./src/ensemble.ts