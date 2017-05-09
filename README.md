A quick hacked together project to test out my two npm packages.

## About
- Uses alexs-redux-fetch to handle api calls/storing entities
- Fails 2/3 times to demonstrate optimistic updates as well as retrying and cancelling a failed request. 

## Usage

### Getting Started
```js
git clone git@github.com:AlexRobinson-/redux-fetch-example.git
cd redux-fetch-example
yarn
yarn start
```

### Login Details
**Username** test

**Password** 123

## Whats in the project

### alexs-redux-fetch
This project demonstrates a few things from my library alexs-redux-fetch.

This includes:
 - Using the generic entity store
 - Using the fetch actions to keep track of api state
 - Optimistic updates
 - Handling failed api calls and retrying (2/3 api calls fail)
 - Using the provided timestamp data to only fetch when data becomes old (see users actions)
 