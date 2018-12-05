#!/bin/bash

baseDir=`pwd`
mkdir -p results

for x in $(ls -a); do
    if [[ ${x,,} =~ ${NAME,,} ]]; then
        echo "Codecov coverage testing on ${x}"
        cd ${baseDir}/${x} && codecov >> ${baseDir}/results/codecov-coverage-results.txt
        echo -e "\n\n"
    fi
done

cat ${baseDir}/results/codecov-coverage-results.txt