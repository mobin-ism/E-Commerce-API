# E Commerce API

An advanced Todo application built with Node.js (v22.11.0), NestJS and Postgres. This app allows users to manage products across different categories and allows users to mange orders.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
    - [Docker Deployment](#docker-deployment)
    - [Local Deployment](#local-deployment)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)

---

## Project Structure

```
e-commerce-api/
│   ├── sql/
│   ├── src/
│   ├── test/
│   ├── .dockerignore
│   └── .env.example
│   └── .eslintrc.js
│   └── .gitignore
│   └── .prettierrc
│   └── Dockerfile
│   └── package.json
│   └── README.md # Project documentation
│   └── yarn.lock
│   └── nest-cli.json
│   └── tsconfig.build.json
│   └── tsconfig.json
│   └── docker-compose.yml # Compose file for running the app
```

---

## Setup and Installation

### Docker Deployment

1. **Docker**:
   Ensure Docker and Docker Compose are installed on your machine.

2. **Clone the repository**:

    ```bash
    git clone https://github.com/mobin-ism/E-Commerce-API.git
    cd E-Commerce-API
    ```

3. **Build and run the application**:

    ```bash
    sudo docker compose build --no-cache && sudo docker compose up -d
    ```

4. **Database Creation**:

    - If you see `Unable to connect to the database` error, then you need to create a database manually by any datbase client or using your terminal.
      Please make sure that you are using valid database credentials while creating the database:

    ```bash
    DB_HOST=postgres
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=pLSkczmWBHK0CVh
    DB_NAME=e-commerce-api
    ```

5. **Access the application**:
    - **API**: [http://localhost:3000/docs](http://localhost:3000/docs)

---

### Local Deployment

1. **Install prerequisites**:

    - Node.js (v22.11.0)
    - Yarn (v1.22.22)
    - PostgreSQL

2. **Clone the repository**:

    ```bash
    git clone https://github.com/mobin-ism/E-Commerce-API.git
    cd E-Commerce-API
    ```

3. **Set up environment variables**:
   Create `.env` file. See the [Environment Variables](#environment-variables) section for details.

4. **Install dependencies and run services**:

    - **Backend**:
        ```bash
        yarn
        yarn start:prod
        ```

5. **Access the application**:
    - **API**: [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

### Backend

Create a `.env` file and copy all the content from `.envExample`:

```
APP_ENV=development
APP_PORT=3000
APP_URL=http://localhost:3000

# DEVELOPMENT ENVIRONMENT
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=e-commerce-api

#MISC
DEFAULT_PAGE_SIZE=25
RATE_LIMITER_TIME_TO_LEAVE=6000 #MILLISECONDS
RATE_LIMITER_MAX_TRY=60
```

---

## API Endpoints

You can see the API documentation in Swagger, If you follow the local deployment.
Go to [http://localhost:3000/docs/](http://localhost:3000/docs/)

---
