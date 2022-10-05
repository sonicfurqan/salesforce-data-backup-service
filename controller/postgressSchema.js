
const { getAllSObjects } = require('./salesforceSchema');

//inserts salesforce object names into psql Object table
const insertSObjectNameToDatabase = async () => {

    let metrics = {
        failedRecords: 0,
        newRecordCount: 0,
    };

    const sObjectList = await getAllSObjects();
    await global.db.connect();


    let queryHeader = 'INSERT INTO "Objects" ("name","label","isCustom" ,"associateEntityType") VALUES ';
    let query = queryHeader;


    let offset = 50;
    let transaction;




    for (let i = 0; i < sObjectList.length; i++) {
        let associateEntityType = (sObjectList[i].associateEntityType) ? "'" + sObjectList[i].associateEntityType + "'" : 'NULL';
        //preparing values query
        query += `('${sObjectList[i].name}','${sObjectList[i].label}',${sObjectList[i].isCustom},${associateEntityType}),`;

        if (i >= offset) {
            //inserting 50 records at a time
            offset = (sObjectList.length > offset + 50) ? offset + 50 : sObjectList.length - 1;
            query = query.replace(/,\s*$/, "");
            query += ' ON CONFLICT ("name") DO NOTHING;'
            try {
                transaction = await global.db.sequelize.transaction();
                const [results, metadata] = await global.db.query(query);
                metrics.newRecordCount += metadata;
                await transaction.commit();
            }
            catch (e) {
                if (transaction) {
                    metrics.failedRecords += i - offset;
                    await transaction.rollback();
                }
            }
            query = queryHeader;
        }
    }
    return metrics;
}

//setup any required psql tables
const setupDefaultDatabaseSchema = async () => {

    await global.db.connect();
    await global.db.initializeDefaultDatabase();

}


module.exports = {

    setupDefaultDatabaseSchema,
    insertSObjectNameToDatabase
}