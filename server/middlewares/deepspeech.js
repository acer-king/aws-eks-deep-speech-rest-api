const ds = require('deepspeech');
const fs = require('fs');
var load = require('audio-loader')
let model = new ds.Model('../index/deepspeech-0.9.3-models.pbmm');
model.enableExternalScorer('../index/deepspeech-0.9.3-models.scorer');


console.log(ds.Version());
console.log(model);


const deepSpeech = async (req, res, next) => {
    //if no file was received
    if (!req.file) {
        res.send({ message: 'No audio file has been received' });
        return
    }
    let speechToText = await model.stt(req.file.buffer);
    console.log('recognized speech = ', speechToText);
    console.log(model.sampleRate(), "samplerate")

    if (speechToText.length > 0) {
        req.locals = speechToText;
        next();
    } else {
        //res.send({ message: 'couldn\'t recognize that' })
        //res.send({ message: 'success', data: 'couldn\'t recognize that' })
        res.send({
            error: 'No speech was recognized',
        })
    }
    return
}

const deepSpeechByUrl = async (req, res, next) => {
    //if no file was 
    if (!req.body.url) {
        res.send({ message: 'No audio file has been specified' });
        return
    }

    let buffer = await (load(req.body.url))
    const meta = { length: buffer.length, numberOfChannels: buffer.numberOfChannels, sampleRate: buffer.sampleRate, duration: buffer.duration }

    //let transcription = await model.sttWithMetadata(buffer._data, 3);
    //meta = { ...meta, transcription }
    let speechToText = await model.stt(buffer._data);
    if (speechToText.length > 0) {
        req.locals = speechToText;
        req.meta = meta;
        next();
    } else {
        //res.send({ message: 'couldn\'t recognize that' })
        //res.send({ message: 'success', data: 'couldn\'t recognize that' })
        res.send({
            error: 'No speech was recognized',
        })
    }
    return
}

module.exports = { deepSpeech, deepSpeechByUrl };
