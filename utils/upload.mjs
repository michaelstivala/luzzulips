// Build the final metadata files while leaving the original _metadata.json intact
import 'dotenv/config'
import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'
import path from 'path'


import fs from 'fs'
const basePath = process.cwd();

const imageDirectoryPath = `${basePath}/build/images`;
const metadataDirectoryPath = `${basePath}/build/json`;
let cid, status;

const storage = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });

// first upload all images to IPFS
const images = filesFromPath(imageDirectoryPath, {
  pathPrefix: path.resolve(imageDirectoryPath), // see the note about pathPrefix below
})



console.log(`storing file(s) from ${path}`)
cid = await storage.storeDirectory(images)
console.log({ cid })

status = await storage.status(cid)
console.log(status)

// then update the metadata
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  let metadata = {
    image: `ipfs://${cid}/${item.edition}.png`,
    attributes: item.attributes
  }

  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}.json`,
    JSON.stringify(metadata, null, 2)
  );
});

// then upload all the metadata to IPFS
const metadata = filesFromPath(metadataDirectoryPath, {
  pathPrefix: path.resolve(metadataDirectoryPath),
})

console.log(`storing file(s) from ${path}`)
cid = await storage.storeDirectory(metadata)
console.log({ cid })

status = await storage.status(cid)
console.log(status)

console.log("New baseUri: " + `ipfs://${cid}/`)

