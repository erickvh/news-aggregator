# News aggregator

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

### Enviroment variables

Just copy .env.example in the same path you need to make sure that the file has been named .env then replace the values with yours

```
  API_KEY_NYT= <API KEY NEW YORK TIMES>
  API_KEY_GUARDIAN= <API KEY THE GUARDIAN>
  JWT_SECRET=<SECRET JWT>
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

## Usage

You can use the endpoint bellow:

```

GET http://127.0.0.1:3000/news?q=google&source=guardian

```

there are two valid query params:

```
q: for filter news by keywords [mandatory]
source: a journalist source, it can be nyt (for new york times) or guardian (for the guardian) or leave it empty to get data from both

```

For New York Times source you need to be authenticated even if you want to get both resource at once.
