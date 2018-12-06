#!/bin/bash

# Please run this script from the same directry with all the servers
# Rename all the API Servers to they have a common substring
# Use that common substring in the -n <common substring>

# Example usage:
#   ./scripts/startAndTest -n 340ct

while getopts n:m: option
do
case "${option}"
in
n) NAME=${OPTARG};;
esac
done

baseDir=`pwd`

function printExampleUsage {
    echo -e "# Example usage:
    #   ./scripts/startAndTest -n 340ct"
}

if [ -z ${NAME} ]; then
    echo "Please enter a common name on the API Servers. Please use flag -n <name>"
    printExampleUsage
    exit 1
fi

for x in $(ls -a); do
    if [[ ${x,,} =~ ${NAME,,} ]]; then  
        echo "Starting server ${x}" && cd ${baseDir}/${x}  && npm start &
        sleep 20    
    fi
done

exit 0
