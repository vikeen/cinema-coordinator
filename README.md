# cinema-coordinator

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.5.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.4.0, npm ^2.14.20
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [Postgres - 9.4.5](http://www.postgresql.org/) (`brew install postgres`)

#### Database Setup
1. `CREATE DATABASE cinema_coordinator_dev;`
1. `CREATE DATABASE cinema_coordinator_test;`
1. `CREATE ROLE cinema_coordinator_user WITH PASSWORD 'password' LOGIN;`
1. `GRANT ALL ON DATABASE cinema_coordinator_dev TO cinema_coordinator_user;`
1. `GRANT ALL ON DATABASE cinema_coordinator_test TO cinema_coordinator_user;`


### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
