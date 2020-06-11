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
NEWS_API_KEY= <NEWS API KEY>

JWT_SECRET=<SECRET JWT>

PORT_DB=<PORT_DB>
USER_DB=<USER_DB>
PASSWORD_DB=<PASSWORD_DB>
NAME_DB=<NAME_DB>
HOST_DB=<HOST_DB>
PORT=<PORT>

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
source: a journalist source, it can be nyt (for new york times), guardian (for the guardian). news api (newsapi) or leave it empty to get data from both

```

For all the resources is needed to be authenticated

### How to register and authenticated

```
POST http://127.0.0.1:3000/register

send json body like this.
{
    "username":"erickv94",
    "password":"holamundo",
    "name":"erick ventura",
    "email":"erickv94@gmail.com"
}

when you're registered you will be able to authenticated like this.

POST 127.0.0.1:4000/login

send json body like this.

{
    "username":"erickv94",
    "password":"holamundo",
}

this will return a response like that.

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVyaWNrdjk0IiwicGFzc3dvcmQiOiJob2xhbXVuZG8iLCJpYXQiOjE1OTE5MTQ0NDksImV4cCI6MTU5MjAwMDg0OX0.qYXRlVZAMSp36VPEEpTqPMirWrwx8iGpPqUQRVsaeKY"
}


```
