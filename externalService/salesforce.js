const jsforce = require('jsforce');
const process = require('process');

const USERNAME = process.env.SF_USERNAME;
const PASSWORD = process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN;


const { SF_CONNECTION_CONFIG } = require('../config/default');



class Salesforce {
    constructor() {
        this.conn = new jsforce.Connection(SF_CONNECTION_CONFIG);
    }

    async connect() {
        let connections = await this.conn.login(USERNAME, PASSWORD);
        console.log('Connected to Salesforce ' + this.conn.instanceUrl);
        return this;

    }

    async query(query) {
        return this.conn.query(query);
    }

    async describeAllSObjects() {
        return this.conn.describeGlobal();
    }

    async describeSObject(sobjectName) {

        try {
            return await this.conn.sobject(sobjectName).describe$();
        } catch (e) {
            return await this.conn.sobject(sobjectName).describe();

        }


    }
}



module.exports = Salesforce;