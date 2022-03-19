# ITCrowd Challenge API - Backend Documentation

# Introduction

ITCrowd Challenge API - Backend is a challenge project.

# Demo Links

All Products Endpoint: GET https://itcrowd-challenge-backend.herokuapp.com/api/products
<br>
Individual Product Endpoint: GET https://itcrowd-challenge-backend.herokuapp.com/api/products/1
<br>
All Brands Endpoint: https://itcrowd-challenge-backend.herokuapp.com/api/products

# Tech I Have Used

- NodeJs
- ExpressJs
- Sequelize
- MySql
- JsonWebtoken

<br>

# Getting Started & Installation

For getting started with the project you have to follow the below procedure.

-- Install MySQL Community Server in your development environment. You can find the proper installer for your Operating System from the link below:

- https://dev.mysql.com/downloads/mysql/

-- Run the following command to install npm packages dependencies:
`npm install`

-- Once installed the project dependencies is necessary to create a .env file in the `root` directory.

-- You can copy the content of `.env.template` from the root directory and replace it with your data.
<br>

```
PORT=
DB_HOSTNAME=[Host where the DB server is running]
DB_NAME=[Database name]
DB_USERNAME=[Database username]
DB_PASSWORD=[Password assigned to the userName]
JWT_KEY=[JWT SECRET KEY - Any hashed value]
JWT_EXPIRATION_TIME=1h
API_URL=[URL where this API is runnig - For example: https://itcrowd-challenge-backend.herokuapp.com/api]
```

<br>

-- Runs the app in the development mode: `npm start`
