const ds = require('deepspeech');
const fs = require('fs');
var load = require('audio-loader')
const DeepSpeech = require('deepspeech');
const Fs = require('fs');
const Sox = require('sox-stream');
const MemoryStream = require('memory-stream');
const Duplex = require('stream').Duplex;
const Wav = require('node-wav');
const Axios = require('axios');
var https = require('https');
const fetch = require('node-fetch');
let toBuffer = require("typedarray-to-buffer")

const { Http2ServerResponse } = require('http2');


let model = new ds.Model('../index/deepspeech-0.9.3-models.pbmm');
model.enableExternalScorer('../index/deepspeech-0.9.3-models.scorer');


console.log(ds.Version());
console.log(model);

function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

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
    // var load = require('audio-loader')
    // const audiodata = await load(req.body.url)
    // const meta = { length: audiodata.length, numberOfChannels: audiodata.numberOfChannels, sampleRate: audiodata.sampleRate, duration: audiodata.duration }
    var start = new Date().getTime()
    const resp = await Axios.request({
        responseType: 'arraybuffer',
        url: req.body.url,
        method: 'get',
        headers: {
            'Content-Type': 'audio/mpeg',
        }
    })
    var loadingTime = new Date().getTime() - start
    try {
        start = new Date().getTime()
        req.locals = model.stt(resp.data);
        var calcTime = new Date().getTime() - start
        req.meta = { loadingTime, calcTime }
        next();
    }
    catch (e) {
        req.locals = ""
        req.meta = {}
        next();
    }
    return
}

module.exports = { deepSpeech, deepSpeechByUrl };
