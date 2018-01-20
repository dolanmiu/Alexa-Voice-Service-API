const fs = require("fs");
const mic = require("mic");
const record = require("node-record-lpcm16");

const AVSApi = require("../dist").AVSApi;

// var micInstance = mic({
//     rate: "16000",
//     channels: "1",
//     debug: true,
//     exitOnSilence: 6,
// });

// micInstance.start();

const stream = record.start({
    verbose: true,
});

const avs = new AVSApi(stream);
console.log(avs.start());
