#!/bin/bash

baseDir=`pwd`
mkdir -p ${baseDir}/results

echo "Codecov coverage testing on ${x}"
codecov >> ${baseDir}/results/codecov-coverage-results.txt
echo -e "\n\n"

cat ${baseDir}/results/codecov-coverage-results.txt

exit 0