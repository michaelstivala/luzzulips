const basePath = process.cwd();
const fs = require("fs");
const { exit } = require("process");
const layersDir = `${basePath}/layers`;

const { layerConfigurations } = require(`${basePath}/src/config.js`);

const { getElements } = require("../src/main.js");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

let traitGroups = data
                    .map(d => d.attributes.map(a => a.trait_type))
                    .flat()
                    .filter((value, index, self) => self.indexOf(value) === index)


console.log(editionSize)
console.log(traitGroups)

traitGroups.forEach(name => {
  let values = data
              .map(d => d.attributes.filter(a => a.trait_type == name))
              .flat()
              .map(a => a.value)
              .reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {})
  
  Object.keys(values).forEach(key => {
    values[key] = `${values[key]}/${editionSize} editions (${Math.round(values[key] / editionSize * 1000)/10}%)`
  })

  rarityData.push({name, values})
})

console.log(rarityData)
