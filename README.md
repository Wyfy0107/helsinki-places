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
4. Run the project: `./scripts/run.sh`
5. Run test backend: `./scripts/backend-test.sh`
6. Run test frontend: `./scripts/frontend-test.sh`

To run the project in development with docker:

1. `docker-compose build`
2. `docker-compose up`
