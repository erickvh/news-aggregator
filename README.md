# News aggregator

## Homework questions

1. Which patterns does Nest.JS use? Why? How are they implemented?

- Dependency Injection: Nest uses dependency injection in the different providers that are defined within each module, since a file has the @Injectable decorator, it can be injected to other providers and modules, nest supports dependency injections in the provider constructors, as well as in asynchronous configurations within the modules using the Inject keyword.

- Decorator: Nest uses decorators to perform different actions within the program, these decorators allow the use of middlewares, definition of classes of injectable type, entity, among others.

- Factory Method: used at the time of starting the nest project, every nest project in the root has a main.ts file, in which the NestFactory class is used, which has different methods that allow among other things the creation of the application instance

- Singleton: Nest uses the singleton design pattern from the moment the server starts, since it is at this point that it performs the instantiation of the different modules that comprise the api and with it all the providers, controllers and others elements. in this process, unique instances are created, which are used in the execution process, in the same way, the imports defined in each of the services are instantiated using the singleton pattern.

2. Which patterns can be used on your application? How those patterns could be implemented?

- Singleton
- Decorator
- Factory Method
- Dependency Injection

The patterns mentioned above will be implemented in the way nest does by default.

- Repository: It will be implemented using TypeORMModule, creating custom repositories, which will extend from the different repositories managed by the TypeORM, said repositories will be used to separate the data access logic from the services logic or even can be created using injection decorator to inject the entity and doing the use generics for using the original methods to retrieve and access to data.

- Strategy: It will be implemented in the case of the news search functionality in third-party apis, having as a premise that each type of source for the search will represent a search strategy, for its implementation, 3 strategy files will be created, 1 file to handle the context of the strategy, 1 file for interface management and the service that will be responsible for managing The context class.

- Observer: will be implemented through the rxjs library, within the functionality of consulting the news apis, nest works in conjunction with rxjs, so when using the http module and consulting the different apis, they return objects observables, which are subsequently iterated and treated to be able to display the information extracted from the api

3. Explain in your own words, what an antipattern is. Also, explain how to implement the Dependency Injection pattern in Typescript (with an example)

An anti-pattern is a way to solve problem which is not the best way to solve, that can be for maintain purposes in the future also performance can be reached for this bad practices making the code not readable and making hard to implement new functionalities.

#### Implementing Dependency Inyection

To implement the dependency injection, it is necessary to have two classes, of which one will be injected to the other, said injection can be done through the constructor or through a function that performs the injection.

The class that will receive the injection of dependencies, must have an attribute whose type corresponds to the second class in question and may have a constructor that receives as a parameter the second class, if the constructor exist, the injection of dependencies will be carried out through it, if you don't have a constructor, you must have a function that allows this action.
The method mentioned above is to perform a simple dependency injection.

#### Dependency Inyection Example

```typescript
// class mouse
class Mouse {
  private battery: Battery;
  constructor(battery: Battery) {
    this.battery = Battery;
  }
  setBattery(battery: Battery): void {
    this.battery = Battery;
  }
  getBattery(): string {
    return this.battery.getBattery();
  }
}

// class Battery
class Battery {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  getBattery(): string {
    return this.name;
  }
}

// class main
const mouse = new Mouse(new Battery('Rayovac'));
console.log(mouse.getBattery());
```

4. Implement at least 2 design patterns in your API (the ones implemented by Nest.js won't be taken into account). Why did you use them?

- Strategy Design Pattern: this pattern seeks to solve coincides with the requirement to search for news in third-party APIS. For its implementation, it was taken as consideration that each of the apis consulted represented a search strategy for each source.

- Observer: this pattern in order to do the search news functionaity in third-party apis, I did the use of this pattern with the help of the rxjs library and the http module, Nest using http Module automatically subscribed to the object, so the information was accessed without having to do this step manually.

5. Remove all antipatterns that you can found on your API side. Why did you think it is an antipattern?

- The blob: Some .service files contained code that had no relation to the main purpose of the class, for example in the news.service.ts file there were functions to collect each api source instead of having the general purposes to apply bussiness logic so, i used the strategy pattern to separate this for an set of strategies instead to have more code not necessary.

Which patterns did you use? Which antipatterns did you remove? (if any)

Provided by Nest

- Singleton
- Decorator
- Factory Method
- Dependency Injection

Others

- Strategy
- Observer

##### Anti-Patterns Removed

- The Blob

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
