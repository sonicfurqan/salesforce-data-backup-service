const { setupDefaultDatabaseSchema, insertSObjectNameToDatabase } = require('../controller/postgressSchema');
const { getDescribeSObjects } = require('../controller/salesforceSchema');
const { generateCreateTableQuery } = require('../utility/schema');


exports.setupDefaultSchema = async (req, res, next) => {
    if (!global.isDBConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }
    await setupDefaultDatabaseSchema();
    res.send('database sync');

};

exports.syncAllSObjectNames = async (req, res, next) => {
    if (!global.isDBConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }
    let result = await insertSObjectNameToDatabase();
    res.send(result);


}

exports.getAllObjects = async (req, res, next) => {
    if (!global.isDBConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }
    const [results, metadata] = await global.db.getAllSObjects();

    res.send(results);


}

exports.syncSObject = async (req, res, next) => {
    if (!global.isDBConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }
    let objectName = req.params.sObjectApiName;

    let salesforceObjectFields = await getDescribeSObjects(objectName);
    let objectDefinition = generateCreateTableQuery(objectName, salesforceObjectFields);
    let objectResponse = await objectDefinition.sync();


    let updateQuery = `UPDATE "Objects" SET "isSynced" = true ,"syncedDate"=CURRENT_TIMESTAMP WHERE "name" = '${objectName}';`;

    const [results, metadata] = await global.db.query(updateQuery);

    res.send('Created Table : ' + objectName);


}