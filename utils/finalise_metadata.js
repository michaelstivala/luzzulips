const basePath = process.cwd();
const fs = require("fs");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);



async function main() {

for(let i = 0; i < data.length; i++) {
  // Make any changes you want to the metadata here...

  // let metadata = data[i];
  // metadata.attributes = ...
  // data[i] = metadata;
}


  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  // Save all the metadata
  for(let i = 0; i < data.length; i++) {
    fs.writeFileSync(
      `${basePath}/build/json/${data[i].edition}.json`,
      JSON.stringify(data[i], null, 2)
    );
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
