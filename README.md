# Secure The Task

👋 Hi, welcome, and thanks for coming along!

## VERY Important Notice!

I have kept an extensive Devlog in [Notion](https://www.notion.so/) with all of my notes, thoughts, decision making and more, keeping this readme more focused. (I have needed to work privately but also share this with you publicly, There may be a need to sign-up. for the Notion published Devlog, I kindly request that you do so to understand my process)

**[Read the Devlog 👀](https://perfect-rhodium-442.notion.site/THM-Devlog-Secure-the-Task-38c19eebba3c468986b4f93344015686)**

## API

To maintain a single source of truth, please visit Notion:

**[Read the API Docs](https://perfect-rhodium-442.notion.site/API-Design-dc3b9f79e37f43688783c9ba0322502b)**

## Quick Workspace Overview

Secure the task is a mono-repo with [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
![Workspace](./docs//charts/workspace.png)

### Prod vs Dev

![Untitled](./docs/charts/prod-vs-dev.png)

In development I use the provided CRA development server, but as CRA is now unsupported. I have learned that this has worked out well, in real life, this would be the time to consider upgrading to Vite.

I setup a separate UI server that would run for production builds and call the API.

In development you can't use the production API server, instead, we would call the mock-server directly from the UI development server. I realise that this is a step away from production but the point is to get the data now how, this gives us better up-time as we won't need to worry about bad data.

Aside from this, we have Newman (Postman) tests for validating that the production API server is implemented correctly, this can equally use the mock server for its responses rather than AWS.

### Environment Variables (CRA)

The UI development server is CRA-based so some config is needed but I don’t recommend changing these values.

| ENV           | Description                                                                                                     |     |
| ------------- | --------------------------------------------------------------------------------------------------------------- | --- |
| TASKS_API_URL | Used to point to endpoints then run dev against the mock server OR Build production against the prod API server |     |
| SSL_CRT_FILE  | Point to your generated development isometric certificate                                                       |     |
| SSL_KEY_FILE  | Point to your generated development isometric privete key                                                       |     |
| HTTPS         | Enable https and requires isometric key and cert as mentioned                                                   |     |

### Ports, Dependents and Environment usage

The default ports which I have set to run on host:
[https://securetasklist.local](https://securetasklist.local/)

To make things simple, prod and their equivalent development counterparts run o

| Process           | Port | dependent on    | Used in                                                                             |
| ----------------- | ---- | --------------- | ----------------------------------------------------------------------------------- |
| ui-server (built) | 5000 | api-server      | Production only                                                                     |
| api-server        | 3000 |                 | Production or Tests                                                                 |
| ui (CRA sources)  | 5050 | mock-api-server | Development only                                                                    |
| mock-api-server   | 3030 |                 | Development, tests, manual DB seeding for this exercise, anything you can think of. |

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en): Install the latest LTS version of Node.js from the official website. Node.js is the runtime environment required to run JavaScript (and by extension, TypeScript) code outside the browser.
- [npm](https://www.npmjs.com/) (Node Package Manager): Comes bundled with Node.js. It's used to manage Node.js packages, I am using the public registry at this time but should be changed in future.
- [brew](https://brew.sh/): as this repository only supports MacOS dev at this time, it is likely that you already have brew.
- [mkcert](https://formulae.brew.sh/formula/mkcert#default): `brew install mkcert` we need this for making a TLS Certificate and Private Key. For HTTPS, you will need a TLS certificate and a private key, instructions to follow. For development purposes, you can generate a self-signed certificate. For production, you should obtain a certificate from a trusted Certificate Authority (CA).
- [Git](https://git-scm.com/) (for development): If you plan to manage your project with version control (highly recommended).
- Text Editor or IDE (for development): A text editor like Visual Studio Code, Sublime Text, or an Integrated Development Environment (IDE) like WebStorm for writing your code.
- [prettier](https://prettier.io/) (for development): idealy code formatting would be hocked up by commits but presently it's ran manually and periodically, a future action would be to hook this up to autosave or on commit.

## Installation

By the end of this installation, you should be able to start a secure express.js server, you can also run tests and generate parts of the project.

### Clone from repo

> In a Terminal cd to your desired location it is assumed that you already know how to clone the repo and have `cd $PATH_TO_PROJECT_ROOT``.

### Install Node Dependencies

run `npm install` at the root of the project.

Secure the task is a mono-repo with [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces), Observe how the dependencies of the app packages in `app` directory are now installed at the root of the project.

### Prep your machine

Please add the following line to your `/etc/hosts` file.

```python
127.0.0.1   securetasklist.local
```

### Create Certs

1. You may need to replace variables starting with `$` with the correct information

```bash
cd $PROJECT_ROOT/certs
```

2. If you haven't already, Install a local cert authority

```bash
mkcert -install
```

3. create certs

```bash
mkcert securetasklist.local
```

4. verify
   Observe all errors and `ls` to verify that your cert and key have been created, they should be called

```txt
certs
├── securetasklist.local-key.pem
└── securetasklist.local.pem
```

Congratulations you can now start the secure express api server!

## Start the Project
