const basePath = process.cwd();
const fs = require("fs");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

async function main() {

  console.log(data.length)


  order = shuffle([...Array(data.length).keys()]);

  console.log(order)

  // prepend all files with an underscore
  for(let i = 0; i < data.length; i++) {
    fs.renameSync(
      `${basePath}/build/images/${data[i].edition}.png`,
      `${basePath}/build/images/_${data[i].edition}.png`
    );
  }

  for(let i = 0; i < data.length; i++) {

    // rename images
    fs.renameSync(
      `${basePath}/build/images/_${data[i].edition}.png`,
      `${basePath}/build/images/${order[i]}.png`
    );

    // delete json files
    fs.unlinkSync(
      `${basePath}/build/json/${data[i].edition}.json`
    );

    // update the metadata
    data[i].name.replace(data[i].edition, order[i]);
    data[i].image.replace(data[i].edition, order[i]);
    data[i].edition = order[i];
  }
  

  // Save all the metadata
  for(let i = 0; i < data.length; i++) {
    fs.writeFileSync(
      `${basePath}/build/json/${data[i].edition}.json`,
      JSON.stringify(data[i], null, 2)
    );
  }
  
  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  console.log("Order shuffled.");
  console.log("Be sure to re-upload both images and metadata, since the image URLs have changed.");
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
