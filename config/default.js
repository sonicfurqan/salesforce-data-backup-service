const process = require('process');

const ENV = process.env.SF_ENV == 'production' ? 'https://login.salesforce.com' : 'https://test.salesforce.com';
const CLIENT_ID = process.env.SF_CLIENT_ID;
const CLIENT_SECRET = process.env.SF_CLIENT_SECRET;

const API_VER = process.env.SF_API_VER;


const SF_CONNECTION_CONFIG = {
    loginUrl: ENV,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    version: API_VER
}

const PG_CONFECTION_CONFIG =process.env.PG_DATABASE_URL;

module.exports = {
    SF_CONNECTION_CONFIG: SF_CONNECTION_CONFIG,
    PG_CONFECTION_CONFIG: PG_CONFECTION_CONFIG
}