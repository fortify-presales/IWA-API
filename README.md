![Continuous Inspection](https://github.com/fortify-presales/IWA-API/workflows/fod/badge.svg)

# IWA-API - 

#### Table of Contents

*   [Overview](#overview)
*   [Forking the Repository](#forking-the-repository)
*   [Building the Application](#building-the-application)
*   [Running the Application](#running-the-application)
*   [Licensing](#licensing)

## Notice

## Overview

_IWA-API_ is an insecure Sptring Boot/Java REST API for use in DevSecOps demonstrations.
It includes some examples of bad and insecure code - which can be found using static and dynamic application
security testing tools such as those provided by [Fortify by OpenText](https://www.microfocus.com/en-us/cyberres/application-security).

The application is intended to provide the functionality of a typical "online pharmacy", including purchasing Products (medication)
and requesting Services (prescriptions, health checks etc). It has a Swagger based API.

*Please note: the application should not be used in a production environment!*

## Forking the Repository

In order to execute example scenarios for yourself, it is recommended that you "fork" a copy of this repository into
your own GitHub account. The process of "forking" is described in detail in the [GitHub documentation](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) - you can start the process by clicking on the "Fork" button at the top right.

## Build Requirements

In order to successfully build and run the application you will need to have [Java JDK 11](https://openjdk.org/projects/jdk/11) 
installed and on your path.

## Building the Application

To build the application using Gradle, execute the following from the command line:

```PowerShell
.\gradlew clean build -x test
```

## Running the Application

There are a number of ways of running the application depending on the scenario(s) that you wish to execute.

### Development (IDE/command line)

To run (and test) locally in development mode, execute the following from the command line:

```PowerShell
.\gradlew bootRun
```

Then navigate to the URL: [http://localhost:8888](http://localhost:8888). You can carry out a number of
actions unauthenticated, but if you want to login you can do so as one of the following users:

- **user1@localhost.com/password**
- **user2@localhost.com/password**
  
There is also an administrative user:

- **admin@localhost.com/password**

Note if you login with `user2`, you will be subsequently asked for a Multi-Factor Authentication (MFA) code. You
can find this code by examining the console output.

### Deploy (Docker Image)

The JAR file can be built into a [Docker](https://www.docker.com/) image using the provided `Dockerfile` and the
following commands:

```PowerShell
docker build -t iwa-api -f Dockerfile .
```

or on Windows:

```PowerShell
docker build -t iwa-api -f Dockerfile.win .
```

This image can then be executed using the following commands:

```PowerShell
docker run -d -p 8888:8888 iwa-api
```

There is also an example `docker-compose.yml` file that illustrates how to run the application with HTTPS/SSL using
[nginx](https://www.nginx.com/) and [certbot](https://certbot.eff.org/) - please note this is for reference only as it 
uses a "hard-coded" domain name.

## Developing and Contributing

Please see the [Contribution Guide](CONTRIBUTING.md) for information on how to develop and contribute.

If you have any problems, please consult [GitHub Issues](https://github.com/fortify-presales/IWAPharmacyDirect/issues) to see if it has already been discussed.

## Licensing

This application is made available under the [GNU General Public License V3](LICENSE)
