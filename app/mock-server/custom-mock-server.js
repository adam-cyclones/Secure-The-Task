const { JSONSchemaFaker: jsf } = require("json-schema-faker");
const https = require("https");
const express = require("express");
const fs = require("fs");
const { EventEmitter } = require("events");

class CustomHttpsServer extends EventEmitter {
  constructor(options) {
    super();
    this.app = express();
    this.port = options.port || 5000; // Default port is 5000
    this.httpsOptions = {
      key: fs.readFileSync(options.sslKeyPath), // Path to SSL key
      cert: fs.readFileSync(options.sslCertPath), // Path to SSL certificate
    };
    this.hostname = options.hostname || "localhost";

    this.app.use( (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://securetasklist.local:5050');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        next();
    });

    this.server = https.createServer(this.httpsOptions, this.app);
  }

  setServers(serverBlockFromSchema) {
    // Implement based on your requirement
    // This method is for setting up base paths or other server-related configurations
    return this;
  }

  setPort(port) {
    // doesnt work as expected
    // this.port = port
    // manual overide at listen options bellow
    return this;
  }

  setPaths(pathsFromSchema) {
    Object.keys(pathsFromSchema).forEach((path) => {
      const { httpMethod, uri } = pathsFromSchema[path];

      const baseUri = `/api${uri}`;
      // reporter

      const jsonSchema = Object.values(pathsFromSchema[path].responses)[0];

      // swap tokenized format from mustach to : for express
      const expressParamURI = baseUri.replace(/\{/g, ":").replace(/\}/g, "");
      console.log(`mocking ${httpMethod}: ${expressParamURI}`);

      switch (httpMethod.toLowerCase()) {
        case "get":
        case "post":
          this.app[httpMethod.toLowerCase()](expressParamURI, (req, res) => {
            res.json(
              jsf.generate(jsonSchema).content["application/json"].schema,
            );
          });
        case "delete":
        case "put":
          this.app[httpMethod.toLowerCase()](baseUri, (req, res) => {
            res.status(204).send();
          });
          break;
        default:
          throw new Error(`Not implimented HTTP method for mock server`);
      }
    });
    return this;
  }

  async init() {
    const listenOptions = {
      host: this.hostname,
      port: 3030, // FIXME: manual overide
    };
    return new Promise((resolve, reject) => {  
      this.server
        .listen(listenOptions, () => {
          const { host, port } = listenOptions;
          console.log(`Mock HTTPS Server running: https://${host}:${port}`);
          resolve();
        })
        .on("error", reject);
    });
  }

  async shutdown() {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}

module.exports = CustomHttpsServer;
