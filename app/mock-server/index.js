const configuration = require('./configuration');
const OpenApiMocker = require('open-api-mocker');
const CustomHttpsServer = require('./custom-mock-server');
const { resolve } = require('path');
const { readFile } = require('fs/promises');


const { DEFAULT_CERTS_BASENAME, DEFAULT_HOSTNAME, DEFAULT_PORT } =
  configuration;

const server = new CustomHttpsServer({
    hostname: DEFAULT_HOSTNAME,
    port: DEFAULT_PORT,
    sslKeyPath: resolve("../../", DEFAULT_CERTS_BASENAME, 'securetasklist.local-key.pem'),
    sslCertPath: resolve("../../", DEFAULT_CERTS_BASENAME, 'securetasklist.local.pem')
});

;(async () => {

  const mocker = new OpenApiMocker({
    server,
    schema: resolve('../../openapi.yaml')
  });

  await mocker.validate();
  await mocker.mock();

})();
