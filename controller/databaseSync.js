const logger = require('../utility/logger')
const { generateCreateRecordQuery, generateUpdateRecordQuery } = require('../utility/schema');

const startObjectRecordsSync = async (objectApiName) => {

    let [schemaRecords, schemaMetadata] = await global.db.query(`SELECT column_name FROM information_schema.columns where table_name = '${objectApiName}s';`);


    let queryFieldsList = schemaRecords.map(field => field.column_name).filter(field => field != 'id').filter(field => field != 'LastSyncDate');

    let queryFields = queryFieldsList.join(',');

    let [records, metadata] = await global.db.query(`SELECT "LastSyncDate" FROM "${objectApiName}s" ORDER BY "LastSyncDate" ASC LIMIT 1`);


    let sfQuery = `SELECT ${queryFields} FROM ${objectApiName} `;


    if (records.length > 0) {
        let lastTime = JSON.stringify(records[0].LastSyncDate);
        lastTime = lastTime.replace(/\"/g, "");
        sfQuery += ` WHERE LastModifiedDate >= ${lastTime} `;
    }
    //sfQuery += ' LIMIT 1';


    logger.debug('query sf');



    transaction = await global.db.sequelize.transaction();
    global.sf.conn.bulk.query(sfQuery)
        .on('record', async function (rec) {


            let query = generateCreateRecordQuery(objectApiName, rec);
            let updateQuery = generateUpdateRecordQuery(objectApiName, rec);


            let [insertRecords, insertMetadata] = await global.db.query(query);
            logger.debug(`insert ${insertMetadata}`);

            if (insertMetadata == 0) {
                let [updateRecords, updateMetadata] = await global.db.query(updateQuery);
                logger.debug(`update ${updateMetadata.rowCount}`);

            }


        })
        .on('error', function (err) { console.error(err); });





}

module.exports = {
    startObjectRecordsSync
}