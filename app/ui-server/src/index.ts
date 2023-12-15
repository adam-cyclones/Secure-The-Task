import createClient from "openapi-fetch";
import { paths } from "../../api-schema/schema.js";
import express from "express";
import { readFile } from "fs/promises";
import https from "https";
import { resolve } from "path";
import configuration from "./configuration.js";
import { ListenOptions } from "net";
import routes from "./routes.js";
import helmet from "helmet";

const prodAPIUrl = "https://securetasklist.local:3000/api";
const mockAPIURL = "https://securetasklist.local:5000/api";
const baseUrl = process.env.DEVELOPMENT ? mockAPIURL : prodAPIUrl;

const client = createClient<paths>({
  baseUrl,
});

const { DEFAULT_CERTS_BASENAME, DEFAULT_HOSTNAME, DEFAULT_PORT } =
  configuration;

const app = express();

app.use("/", express.static(resolve("../ui/build")));
app.use(routes);
app.use(helmet());

// ensure PORT env var override is a number at all times
const port: number = parseInt(process.env.PORT || "") || DEFAULT_PORT;

// HOSTNAME env var override and checks falsey
const host: string = process.env.HOSTNAME || DEFAULT_HOSTNAME;
if (!host) {
  throw new Error("Provided HOSTNAME is not a valid string");
}

const pathToCerts = resolve("../../", DEFAULT_CERTS_BASENAME);

// Read the TLS certificate and private key
const key = await readFile(
  resolve(pathToCerts, "securetasklist.local-key.pem"),
  "utf8",
);
const cert = await readFile(
  resolve(pathToCerts, "securetasklist.local.pem"),
  "utf8",
);

const credentials = { key, cert };

const httpsServer = https.createServer(credentials, app);

const listenOptions: ListenOptions = {
  host,
  port,
};

httpsServer.listen(listenOptions, () => {
  console.log(`HTTPS Server running: https://${host}:${port}`);
});
