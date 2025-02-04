# Playground: MSW Remote Server API + Playwright

This repository showcases the example integration of the [MSW Remote Server API](https://github.com/mswjs/msw/pull/2041) with Playwright test runner.

It uses an unstable version of MSW created from the https://github.com/mswjs/msw/pull/2041 PR.

## Getting started

1. Clone the repository:
  ```sh
  git@github.com:SebastianSedzik/msw-remote-server-playwright-example.git
  ```
2. Install dependencies:
  ```sh
  pnpm install
  ```
3. Run Playwright tests:
  ```sh
  pnpm test
  ```

## Overview
This repository includes a server application and Playwright tests to cover its functionalities:

1. [./server-app](https://github.com/SebastianSedzik/msw-remote-server-playwright-example/blob/master/server-app/index.js) An application that exposes two paths:
    - `/`: Main path with links to sub-pages
    - `/recipes`: A page that displays a list of recipes fetched from the https://dummyjson.com API. The list of recipes is fetched on the server side.
2. `./tests`: Playwright tests using MSW Remote Server API to mock server-app requests:
    - [./server-mocked.js](https://github.com/SebastianSedzik/msw-remote-server-playwright-example/blob/master/tests/server-mocked.js): A file responsible for running the server app with MSW.
    - [./setup.ts](https://github.com/SebastianSedzik/msw-remote-server-playwright-example/blob/master/tests/setup.ts): A file responsible for connecting to the server created by `./server-mocked.js` from the test level.
    - [./example.spec.ts](https://github.com/SebastianSedzik/msw-remote-server-playwright-example/blob/master/tests/example.spec.ts): An example Playwright test that mocks calls to the https://dummyjson.com API.

## Running the app (normal mode)
In this mode, the application will make calls to the real API.

```sh
pnpm start
```
> After successfully running the command, the app should be accessible at http://localhost:3000.

## Running app (mocked mode)
In this mode, the application will use MSW handlers instead of making calls to the real API.

```sh
pnpm start-mocked
```
> After successfully running the command, the app should be accessible at http://localhost:3000.
