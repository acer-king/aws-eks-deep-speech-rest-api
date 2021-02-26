FROM 1991412/dastan
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD . /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source

wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm -P ./index
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer -P ./index

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
