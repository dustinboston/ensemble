#!/usr/bin/bash

for dtsfile in $(ls data/dts/*.ts)
do 
    deno run -A 'jsr:@dustinboston/ts-json' $dtsfile > $dtsfile.json
done