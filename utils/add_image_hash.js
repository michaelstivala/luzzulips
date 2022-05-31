const basePath = process.cwd();
const fs = require("fs");
const crypto = require('crypto');

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// function to compute the hash of a file
const computeHash = async (filename) => {
  console.log(filename);
  return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      hash.setEncoding('hex');

      fs.readFile(filename, function (err, data) {
          if (err) {
              reject(err);
          }

          hash.write(data);
          hash.end();

          resolve(hash.read());
      })
  });
}

async function main() {
  for(let i = 0; i < data.length; i++) {
    console.log(`Computing the hash for image ${data[i].edition}`);
    // hash
    data[i].hash = await computeHash(`${basePath}/build/images/${data[i].edition}.png`)
  
    console.log(data[i].hash);
  }
  
  // we only add the hash to the _metadata.json file
  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
