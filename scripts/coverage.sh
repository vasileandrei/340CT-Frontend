#!/bin/bash

while getopts n:m: option
do
case "${option}"
in
n) NAME=${OPTARG};;
esac
done

function printExampleUsage {
    echo -e "# Example usage:
    #   ./scripts/coverage -n 340ct"
}

if [ -z ${NAME} ]; then
    echo "Please enter a common name on the API Servers. Please use flag -n <name>"
    printExampleUsage
    exit 1
fi

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

exit 0