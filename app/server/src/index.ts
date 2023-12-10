import express from "express";
import { readFile } from "fs/promises";
import https from "https";
import { resolve } from "path";
import configuration from "./configuration";
import { ListenOptions } from "net";
import endpoints from "./routes";
import helmet from "helmet";

// TODO: define and conenct up routes to API Layer - I need to change the API layer to point to AWS 
// import { DefaultApi } from "./generated/api"
// const apiLayer = new DefaultApi();
// AND THEN TODO: use newman to run postman tests in node.

const { DEFAULT_CERTS_BASENAME, DEFAULT_HOSTNAME, DEFAULT_PORT } =
configuration;

const app = express();


// ensure PORT env var override is a number at all times 
const port: number = parseInt(process.env.PORT || "") || DEFAULT_PORT;

// HOSTNAME env var override and checks falsey
const host: string = process.env.HOSTNAME || DEFAULT_HOSTNAME;
if (!host) {
  throw new Error("Provided HOSTNAME is not a valid string");
}

const pathToCerts = resolve(__dirname, "../../../", DEFAULT_CERTS_BASENAME);

// Read the TLS certificate and private key
const key = await readFile(resolve(pathToCerts, "securetasklist.local-key.pem"), "utf8");
const cert = await readFile(resolve(pathToCerts, "securetasklist.local.pem"), "utf8");

const credentials = { key, cert };

app.use(endpoints);
app.use(helmet());

const httpsServer = https.createServer(credentials, app);

const listenOptions: ListenOptions = {
  host,
  port,
};

httpsServer.listen(listenOptions, () => {
  console.log(`HTTPS Server running: https://${host}:${port}`);
});
