# Helsinki Places

This web application is built to display places of interest in Helsinki city. Visit [My Helsinki](https://helsinki-places.mlem-mlem.net) here

## Project Structure

The project has 3 building block:

- backend
- frontend-react
- infrastructure

### Backend

An express REST API that will server the react application with data of places coming from [My Helsinki Open API](https://open-api.myhelsinki.fi/doc). The API also connects to a Redis Elasticache node on AWS for response caching. API secrets are stored on SSM parameter store

### Frontend-React

A React Web Application that handles data display. There are two view modes: table and map. The website is hosted on AWS S3 and served by Cloudfront for faster delivery

### Infrastructure

The infrastructure for the entire project is built upon AWS and use Terraform to manage the AWS resources. An overview design of the architecture is shown below:

![Diagram](AWS-Diagram.png)

## Instructions

1. Clone this project: `git clone https://gitlab.com/nguyenduy010798/helsinki-places.git`
2. Allow script execution: `cd helsinki-places && chmod 700 scripts/*`
   Make sure to run the scripts from the project root directory:
3. Install dependencies: `./scripts/install.sh`
4. Produce the build: `./scripts/build.sh`
5. To run or test the project without docker (see below for using docker), make sure a redis database is running and create a .env file in the backend folder with the following variables:

   - REDIS_PORT
   - ENDPOINT

6. Run the project: `./scripts/run.sh`
7. Run test backend: `cd backend && yarn run test`
8. Run test frontend: `cd frontend-react && yarn run test:e2e`

To run the project in development with docker:

1. `docker-compose build`
2. `docker-compose up`

To run test with docker:

1. Backend: `cd backend && yarn run test`
2. Frontend: `cd frontend-react && yarn run test`
