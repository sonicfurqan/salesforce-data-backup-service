

const { startObjectRecordsSync } = require('../controller/databaseSync');




exports.syncsObjectRecords = async (req, res, next) => {
    if (!global.isSFConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }
    let objectApiName = req.params.sObjectApiName;

    if (objectApiName === undefined) {
        res.status(409).send('Object Name Missing.');
        return;
    }

    let [schemaRecords, schemaMetadata] = await global.db.query(`SELECT column_name FROM information_schema.columns where table_name = '${objectApiName}s';`);

    if (schemaRecords.length == 0) {
        res.status(409).send(`Please sync ${objectApiName} metadata before syncing data.`);
        return;
    }

    let queryFields = schemaRecords.map(field => field.column_name).filter(field => field != 'id').filter(field => field != 'LastSyncDate');

    queryFields = queryFields.join(',');

    startObjectRecordsSync(objectApiName)

    res.send('Sync Started for following fields ' + queryFields);



};