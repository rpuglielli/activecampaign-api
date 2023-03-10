# ActiveCampaign API Integration

## Description

This is a Node.js API integration with ActiveCampaign built using the Nest.js framework. This API allows you to merge deals.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

### Create a new contact

Endpoint: /deals/merge
Method: POST

```json
{
    "originDealId": {integer},
    "targetDealId": {integer}
}
```

## License

Nest is [MIT licensed](LICENSE).
