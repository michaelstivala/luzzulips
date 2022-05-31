const basePath = process.cwd();
const fs = require("fs");
const crypto = require('crypto');

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

async function main() {

  if (data[0].hash == undefined) {
    throw new Error('No hash found in metadata.json');
  }

  let hash = data.sort((a,b) => a.edition - b.edition).map(h => h.hash).join('')
  let provenance = crypto.createHash('sha256');
  provenance.setEncoding('hex');
  provenance.write(hash);
  provenance.end();
  let provenanceHash = provenance.read()

  console.log('Provenance Hash:')
  console.log(provenanceHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
