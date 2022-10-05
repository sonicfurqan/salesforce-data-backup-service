const { Sequelize } = require('sequelize');

const { PG_CONFECTION_CONFIG } = require('../config/default');
const { createSupportTables } = require('../config/defaultSchema');


class Database {
    constructor() {
        this.sequelize = new Sequelize(PG_CONFECTION_CONFIG);
        console.log('Connection to',PG_CONFECTION_CONFIG)
    }

    async initializeDefaultDatabase() {
        await createSupportTables();
    }


    async connect() {
        await this.sequelize.authenticate();

    }

    async query(query) {
        return await this.sequelize.query(query);
    }

    async getAllSObjects() {
        return await this.query('SELECT * FROM "Objects"');
    }

    close() {
        this.sequelize.close();
    }
}

module.exports = Database;