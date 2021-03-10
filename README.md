## Deep-talk
Deep-speech react app to test trained models,to visualize the speech to text process, to record the audio from mic to wav using the webaudio API, or to create/use a custom open speech-to-text API.



### Download the Model and Scorer

This app needs two files to work, the acoustic model:
[deepspeech-0.9.3-models.pbmm](https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm)

and the following scorer:
[deepspeech-0.9.3-models.scorer](https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer)

download both files to `/server/index/`

### Build

In the terminal in the repo root directory `npm run build` .

### Server

Now in the terminal `cd server && node server.js`

*** defaults to http://localhost:3001 ***

### API calls

API calls to 

`https://www.deeplanguagesync.com/api/v1/getVoice`

POST requests accepts 16kHZ mono 16bits WAV audio files in multipart form data,the field name should be 'audio'

sample responses:

No audio file:
```json
{
    "message": "No audio file has been received"
}
```

No recognition:
```json
{
    "error": "No speech was recognized"
}
```

Success:
```json
{
    "message": "success",
    "data": "two three"
}
```




