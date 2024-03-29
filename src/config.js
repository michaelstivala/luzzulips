const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const layerConfigurations = [
  {
    growEditionSizeTo: 20,
    layersOrder: [
      { name: "Background", options: { bypassDNA: true } },
      { name: "Tommy Body", options: { displayName: "Body"} },
      { name: "Tommy Clothes", options: { displayName: "Clothes" } },
      { name: "Tommy Face" , options: { displayName: "Face" } },
      { name: "Tommy Hair", options: { displayName: "Hair" } },
    ],
  },
  {
    growEditionSizeTo: 40,
    layersOrder: [
      { name: "Background", options: { bypassDNA: true } },
      { name: "Karma Body", options: { displayName: "Body"} },
      { name: "Karma Clothes", options: { displayName: "Clothes" } },
      { name: "Karma Face" , options: { displayName: "Face" } },
      { name: "Karma Hair", options: { displayName: "Hair" } },
    ],
  },
  {
    growEditionSizeTo: 60,
    layersOrder: [
      { name: "Background", options: { bypassDNA: true } },
      { name: "Zen Body", options: { displayName: "Body"} },
      { name: "Zen Clothes", options: { displayName: "Clothes" } },
      { name: "Zen Face" , options: { displayName: "Face" } },
      { name: "Zen Hand", options: { displayName: "Hand" } },
      { name: "Zen Hair", options: { displayName: "Hair" } },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1024,
  height: 1024,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif
};
