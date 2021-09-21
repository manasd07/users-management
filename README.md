<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript project "users-management".

- This Project is a typescript based NestJS application. Here ,one can find all functionality needed in order to start up a flow with users .
- In this backend application , we have **REST API**'s for the basic CRUD functionality related to users.
- Database involved is **PostgresQL** as a relational database .
- Alongwith the API's , there are unit test cases written for our users controller and service , which contain the full flow of the application as a unit.
- Added **Swagger** support will help us further to enhance readability and also a UI tool for all the API's in place for the project.

## Prerequisites

The Project comes along with some prerequisites in order to run without blockers. The pre-installation of following such things are a mandate:

- An IDE (Eg: Visual Studio Code)
- DBeaver application (As a database manager for Postgres)
- Postgresql installed in system

## Database Setup

Database setup is necessary once the above steps are done so as to ensure that we have the necessary schema setup in our system to check the same. So, follow the below steps to quickly setup the database as we require :-

- Add a root user **postgres** with password **postgres**
- The PORT we use by default is _5432_ generally . Anyways , if it is different on one's end , he/she can edit the same value on the .env file of the application so as to make connection possible.
- Add a connection to postgresql with DBeaver and enter the required information. Please keep a note of the username and password mentioned in point 1. If one is using a different username or password , he/she needs to update the typeorm configurations and also the database connection accordingly.
- Add a schema named users_schema to the connection setup at localhost.
- Database setup is done. Now we can easily jump to the application and start it .

## Adding environment variables

In order to run the project , we have certain dependent private variables which are kept in a .env file . This is not included in the repository to maintain the confidentiality. So , in the root directory , you can find a .env-example file . Add a .env to the root directory of the project and add contents similar to **.env-example** file

## Installation of dependencies

After taking fresh clone of the project , one can install all of the required dependencies with the following command

```bash
$ npm install
```

This will install whatever is needed for the application to run by itself . So, no extra hassles required.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Documentation

In order to make the application more human-readable and for a simple understanding of the API's , we have added swagger support to our API's. On installation of dependencies and running the application , the swagger document is build up and can be accessed by 
```bash
http://localhost:5000/swagger
``` 
Please note if the NODE_PORT in your env is different than 5000 , you can change it accordingly

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Github source - [Manas Dwivedi](https://github.com/manasd07/users-management)
- NestJs official site -[NESTJS_DOCS](https://docs.nestjs.com/)
- Twitter Support - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
