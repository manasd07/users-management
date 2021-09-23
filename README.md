# User Management

## Introduction

User-Management repository includes a backend application involving API's to manage user-persistence layer.

The Backend is developed using [Nestjs](https://nestjs.com/) , built on top of Nodejs and the common scripting language used for writing code is **Typescript** . We are using **Postgresql** as the database system for API interactions.

## Description

- In this application , one can find all functionality needed in order to manage users and their handling with the database.
- In the users module, we have **REST API**'s for the basic CRUD functionality related to users.
- **PostgresQL** is being used as a relational database for maintaing records.
- Alongwith the Rest API's , there are unit test cases written for our users controller and service , which include the full flow of the application as a unit.
- Added **Swagger** support will help us further to enhance readability and a UI tool for all the API's in place for the project.

## How To

### Prerequisites

The Project comes along with some prerequisites in order to run without blockers. Please make sure that these things are already installed on the system before moving on to clone the repo. The pre-installation of following such things are a mandate:

- Install An IDE (Eg: Visual Studio Code) . Ref Link: [VS_CODE Official site](https://code.visualstudio.com/)
- Install [Node](https://nodejs.org/en/)
- Install rimraf globally by  ```$ npm i -g rimraf ```
- Install DBeaver application (As a database manager for Postgres). Ref link: [DBeaver Community](https://dbeaver.io/)
- Install Postgresql in system depending on the OS. Ref Link: [Postgres Official site](https://www.postgresql.org/)

### Database Setup

Database setup is necessary once the above steps are done so as to ensure that we have the necessary schema setup in our system to check the same. So, follow the below steps to quickly setup the database as we require :-

- Add a root user **postgres** with password **postgres**
- The PORT we use by default is _5432_ generally . Anyways , if it is different on one's end , he/she can edit the same value on the .env file of the application so as to make connection possible.
- Add a connection to postgresql with DBeaver and enter the required information. Please keep a note of the username and password mentioned in point 1. If one is using a different username or password , he/she needs to update the typeorm configurations and also the database connection accordingly.
- Add a schema named users_schema to the connection setup at localhost.
- Database setup is done. Now we can easily jump to the application and start it .

### Adding environment variables

In order to run the project , we have certain dependent private variables which are kept in a .env file . This is not included in the repository to maintain the confidentiality. So , in the root directory , you can find a .env-example file . Add a .env to the root directory of the project and add contents similar to **.env-example** file

### Typeorm

We are using Typeorm for Object Relational Mapping in order to connect and deal with database interactions. In order to load up the schema according to required entity , so inside our **.env** one can set :-

```bash
DB_SYNCHRONIZATION=true
```

This will load up the users table on the schema setup.Another option is to manually add tables to database. That's it , we are all done with database setups with typeorm . Now we can install dependencies for project and start interacting with the API.

### Installation of dependencies

After taking fresh clone of the project , one can install all of the required dependencies with the following command

```bash
$ npm install
```

This will install whatever is needed for the application to run by itself . So, no extra hassles required.

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


### Testing the application with unit tests

```bash
# unit tests
$ npm run test

# all tests in watch mode
$ npm run test:watch
```

## Swagger Documentation info

In order to make the application more human-readable and for a simple understanding of the API's , we have added swagger support to our API's. On installation of dependencies and running the application , the swagger document is build up and can be accessed by

```bash
http://localhost:5000/swagger
```

Please note if the NODE_PORT in your env is different than 5000 , you can change it accordingly

## Stay in touch

- Github source - [Manas Dwivedi](https://github.com/manasd07/users-management)
