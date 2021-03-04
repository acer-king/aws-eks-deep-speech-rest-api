const DeepSpeech = require('deepspeech');
const path = require("path")
// Language Model

const modelDirectory = require('path').resolve(__dirname, '..', '..');

function createLanguageModel() {
  const modelPath = modelDirectory + '/index/deepspeech-0.9.3-models.pbmm';
  const scorerPath = modelDirectory + '/index/deepspeech-0.9.3-models.scorer';

  const model = new DeepSpeech.Model(modelPath);
  model.enableExternalScorer(scorerPath);

  return model;
}

module.exports = createLanguageModel;
