#!/bin/bash

while getopts e:a: option
do
case "${option}"
in
e) EMAIL=${OPTARG};;
a) API=${OPTARG};;
esac
done

configFile=".netrc"

function printExampleUsage {
    echo -e "# Example usage:
    #   ./scripts/herokuDeploy -e myEmail -a 123apikey123"
}

if [ -z ${EMAIL} ]; then
    echo "Please enter an email, using -e flag"
    printExampleUsage
    exit 1
fi

if [ -z ${API} ]; then
    echo "Please enter an api-key, using -a flag"
    printExampleUsage
    exit 1
fi

fileContent=$(cat ${configFile})
fileContent=${fileContent//<your-email@address>/$EMAIL}
fileContent=${fileContent//<your-api-key>/$API}
echo ${fileContent} > ${configFile}

echo "setting up confing file for Heroku"
cp ${configFile} ~/.netrc

exit 0