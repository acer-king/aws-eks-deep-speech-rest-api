FROM node:14
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD . /app
RUN apt-get install libasound2-dev
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source

RUN wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm -P ./index
RUN wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer -P ./index

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
