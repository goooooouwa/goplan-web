# GoPlan Web client

This repo is the web client of GoPlan, you need to have a GoPlan API server running when using this client. GoPlan API server repo: [https://github.com/goooooouwa/goplan-api](https://github.com/goooooouwa/goplan-api).

## How to setup local development environment

1. `npm install`
2. `cp .env.development.example .env`
3. modify `.env` to suit your local development preferences

## How to run

1. `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to deploy to production with Docker

1. `cp .env.production.example .env`
2. Modify `.env` to suit your docker deployment preferences
3. `sudo docker compose build`
4. `sudo docker compose up`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Build docker image for multiple platforms (ARM32, ARM64, X86 64)

Ref: https://yeasy.gitbook.io/docker_practice/buildx/multi-arch-images?utm_source=pocket_mylist

docker run --rm --privileged tonistiigi/binfmt:latest --install all
docker buildx create --use --name=mybuilder-cn --driver docker-container --driver-opt image=dockerpracticesig/buildkit:master
docker buildx use mybuilder
docker buildx build --platform linux/arm,linux/arm64,linux/amd64 -t goooooouwa/goplan-web . --push
