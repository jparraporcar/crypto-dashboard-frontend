<h1 align="center">Portfolio Use Only</h1>

> :warning: **Important Note**

This repository and its contents, including installation and deployment instructions, are provided for portfolio review and demonstration purposes only. While the repository is publicly viewable and its code can be executed for review purposes, no license is granted for any further use, distribution, or reproduction of the materials contained herein. Any such activities are prohibited without express permission from the repository owner. Please contact the owner for any questions or requests for use.

# crypto-dashboard-frontend

## Description

crypto-dashboard-frontend operates as a tool for monitoring cryptocurrency price movements on Binance. It enables selection of any tradable tokens listed on Binance, with 6 statistical indicators available for analysis.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Features](#features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contact](#contact)

## Installation

The following prerequisites are required:

- Node.js and npm are installed on the local development machine.
- An AWS account with the necessary permissions is available.
- Github CLI is installed.

### Clone the Repository

The repository is cloned to the local machine:

```
git clone https://github.com/jparraporcar/crypto-dashboard-frontend.git
```


## Install Dependencies

After navigating to the cloned project's directory:

```
cd crypto-dashboard-frontend
```

The project dependencies are installed using npm:

```
npm install
```

## Development

A new branch is created (this step is mandatory for development work as any push to the main branch will trigger the GitHub action for deployment).

```
gh repo checkout -b new-branch-name
```

A .env.development file is created in the root directory and the endpoints coming from the backend deployment are defined within as below:

```
    REACT_APP_LOGIN_API = https://.../apiResourceName
    REACT_APP_REGISTER_API = https://.../apiResourceName
    REACT_APP_PRICE_VOLUME_DATA_API = https://.../apiResourceName
    REACT_APP_PRICE_VOLUME_DATA_WINDOW_API = https://.../apiResourceName
    REACT_APP_ALL_SPOT_TICKER_NAMES = https://.../apiResourceName
```

## Deployment

This project employs a Continuous Deployment (CD) pipeline with AWS. The following steps ensure the frontend is correctly deployed on AWS:

1. **Backend setup:** The backend repository is located at [https://github.com/jparraporcar/crypto-dashboard-backend](https://github.com/jparraporcar/crypto-dashboard-backend). The instructions there are followed for successful deployment.

2. **Defining Endpoints:** Following backend deployment, the endpoints are included in the repository as secrets. Five secrets are defined using the names below:

```
    REACT_APP_LOGIN_API
    REACT_APP_REGISTER_API
    REACT_APP_PRICE_VOLUME_DATA_API
    REACT_APP_PRICE_VOLUME_DATA_WINDOW_API
    REACT_APP_ALL_SPOT_TICKER_NAMES
```

3. **AWS credentials: secrets Configuration:** The appropriate AWS secrets are set in the GitHub repository. These secrets include `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` corresponding to the AWS account.

This project employs GitHub Actions for its CD pipeline. Actions are triggered with each push to the main branch. The workflow is defined in the `.github/workflows/main.yml` file and consists of the following steps:

1. **Setup:** A job runs on the latest Ubuntu version, using Node.js version 16.x.

2. **Install Dependencies:** Dependencies are installed using `npm ci`.

3. **Build:** A production build of the application is generated using `npm run build`.

4. **Deploy:** The application is deployed on AWS via the Serverless Framework. The `serverless-finch` plugin is installed and the frontend is deployed without confirmation. AWS credentials are provided as secrets.

5. **Website:** The link to the deployed website is found in the "Static website hosting" section within AWS S3.

## Features

1. **Token Selection**: Upon signup and login, a list of all tokens that are tradable on Binance is provided.

2. **Timeframe Selection**: A preferred timeframe for token performance analysis can be selected.

3. **Window Length for Statistical Indicators**: The window length for the calculation of statistical indicators can be chosen.

4. **Statistical Indicators**: Once tokens are selected, the screen guides to a selection of various statistical indicators, including:



- **Moving Multiple of Price**:
    <br />
    <figure>
        <img style="width:50%; height:auto;" src="./screenshots/moving-multiple-of-price.jpg" alt="Moving Multiple of Price">
    </figure>
    <br />
    <br />
    <figure>
        <img style="width:150%; height:auto;" src="./screenshots/moving-multiple-of-price-explanation.jpg" alt="Moving Multiple of price explanation">
    </figure> 
    <br />
    <br />
- **Moving Multiple of Volume**:
    <br />
    <figure>
        <img style="width:50%; height:auto;" src="./screenshots/moving-multiple-of-volume.jpg" alt="Moving Multiple of Volume">
    </figure>
    <br />
    <br />
    <figure>
        <img style="width:150%; height:auto;" src="./screenshots/moving-multiple-of-volume-explanation.jpg" alt="Moving Multiple of Volume explanation">
    </figure> 
    <br />
    <br />
- **Moving Average Multiple of Price**:
    <br />
    <figure>
        <img style="width:50%; height:auto;" src="./screenshots/moving-multiple-of-price-avg.jpg" alt="Moving Average Multiple of Price">
    </figure>
    <br />
    <br />
    <figure>
        <img style="width:150%; height:auto;" src="./screenshots/moving-multiple-of-price-avg-explanation.jpg" alt="Moving Average Multiple of Price explanation">
    </figure> 
    <br />
    <br />
- **Moving Average Multiple of Volume**:
    <br />
    <figure>
        <img style="width:50%; height:auto;" src="./screenshots/moving-multiple-of-volume-avg.jpg" alt="Moving Average Multiple of Volume">
    </figure>
    <br />
    <br />
    <figure>
        <img style="width:150%; height:auto;" src="./screenshots/moving-multiple-of-volume-avg-explanation.jpg" alt="Moving Average Multiple of Volume explanation">
    </figure> 
    <br />
    <br />
- **Moving Accumulated Rate of Change of Multiple Price**:
    <br />
    <figure>
        <img style="width:50%; height:auto;" src="./screenshots/moving-multiple-of-price-arc.jpg" alt="Moving Accumulated Rate of Change of Multiple Price">
    </figure>
    <figure>
        <img style="width:150%; height:auto;" src="./screenshots/moving-multiple-of-price-arc-explanation.jpg" alt="Accumulated Rate of Change of Multiple of Price explanation">
    </figure> 
    <br />
    <br />
- **Moving Accumulated Rate of Change of Multiple Volume**:
    <br />
    <figure>
        <img style="width:50%; height:auto;" src="./screenshots/moving-multiple-of-volume-arc.jpg" alt="Moving Accumulated Rate of Change of Multiple Volume">
    </figure>
    <br />
    <figure>
        <img style="width:150%; height:auto;" src="./screenshots/moving-multiple-of-volume-arc-explanation.jpg" alt="Moving Accumulated Rate of Change of Multiple Volume explanation">
    </figure> 
   <br />
   <br />

## Usage

   <br />
    <figure>
        <img style="width:125%; height:auto;" src="./screenshots/app-flow.jpg" alt="App flow">
    </figure> 
   <br />

### Technologies

The crypto-dashboard-frontend application leverages several libraries and frameworks to build an effective, dynamic, and interactive user interface. Below are the main technologies used:

- **ReactJS**: A JavaScript library for building user interfaces. React allows developers to create large web applications that can change data, without reloading the page.

- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development. It is used for state management in the application.

- **TypeScript**: A strict syntactical superset of JavaScript, which adds static typing. This helps to write safer and more readable code, making it easier to maintain.

- **Emotion**: A powerful library for writing CSS in JavaScript. It helps to style components in a more modular and maintainable way.

- **Material UI**: A popular React UI framework with a set of React components that implement Google's Material Design.

- **Axios**: A promise-based HTTP client for the browser and Node.js. It simplifies the process of making asynchronous HTTP requests from the client to the server.

- **React Hook Form**: A performant, flexible and extensible forms library with easy-to-use validation.

- **React Three Fiber and Drei**: Libraries that bring React's component model to Three.js, a cross-browser JavaScript library used to create and display animated 3D computer graphics on a Web browser.

- **Chart.js and React-Chartjs-2**: Charting libraries that help in the visual representation of data in form of charts.

- **Mathjs**: An extensive math library for JavaScript and Node.js. It provides a flexible and user-friendly interface for all kinds of mathematical operations.

- **JWT Decode**: A library to decode JSON Web Tokens (JWT) in JavaScript.

- **Zod**: A TypeScript-first schema declaration and validation library.

- **Serverless and Serverless Finch**: Frameworks for building applications comprised of microservices that helps in deploying AWS lambda functions easily.

- **ESLint and Prettier**: Tools for identifying and reporting on patterns in JavaScript, enhancing code quality and formatting.


## Contact

If you want to contact me you can reach me at:

- **Name**: `Jordi Parra Porcar`
- **Email**: `jordiparraporcar@gmail.com`
- **LinkedIn**: [`Jordi Parra Porcar`](https://www.linkedin.com/in/jordiparraporcar/)
