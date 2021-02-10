# getir-challenge

Codebase for the Getir code challenge.

# Quick Start

- `npm i`
- Set the env variable `MONGODB_URL` to the appropriate connection string
- `npm run start:dev` for development
- `npm start` for production

This starts the API server on [http://localhost:3000](http://localhost:3000).

# Testing

- `npm test`

# Documentation

The production API is located at [https://getir-test-api.herokuapp.com/](https://getir-test-api.herokuapp.com/).

![getir](https://user-images.githubusercontent.com/6097630/107561254-9dd7a800-6bde-11eb-9075-b489b1baf761.png)

### Request

To fetch records, send a `POST` request to [https://getir-test-api.herokuapp.com/](https://getir-test-api.herokuapp.com/).

The body of the `POST` request can contain the following fields:

- `startDate`: Records created on or after this date will be returned.
- `endDate`: Records created on or before this date will be returned.
- `minCount`: Records with “totalCOunt” greater than or equal to this value will be returned.
- `maxCount`: Records with “totalCOunt” less than or equal to this value will be returned.

### Response

A successful request has `code` set to `0`, `msg` set to `Success`, and `records` holding an array of the appropriate records.

```json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 170
        },
        {
            "key": "XlqCuHpo",
            "createdAt": "2016-12-27T15:33:59.004Z",
            "totalCount": 179
        },
        {
            "key": "eBsfCJnz",
            "createdAt": "2016-12-15T23:55:04.926Z",
            "totalCount": 175
        }
    ]
}
```

A failed request has `code` set to a number other than `0` and `msg` set to reason for the failure.

```json
{
    "code": 1,
    "msg": "Could not retrieve records from the database"
}
```