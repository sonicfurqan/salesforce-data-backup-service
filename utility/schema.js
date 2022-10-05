const { DataTypes } = require('sequelize');

const generateCreateTableQuery = (objectName, fields) => {

    let fieldsConfig = {};
    for (let field of fields) {
        if (field.isCompound) { }
        else {
            fieldsConfig[field.name] = {
                type: getDatTypeType(field),
                unique: field.name == 'Id'
            }
        }

    }
    fieldsConfig['LastSyncDate'] = {
        type: DataTypes.DATE
    }
    return global.db.sequelize.define(objectName, fieldsConfig, {
        timestamps: false
    });
}

const getDatTypeType = (field) => {
    if (field.type == 'boolean') {
        return DataTypes.BOOLEAN;
    }
    else if (field.type == 'double' || field.type == 'currency') {
        return DataTypes.DOUBLE;
    }
    else if (field.type == 'int') {
        return DataTypes.INTEGER;
    }
    else if (field.type == 'address') {
        return DataTypes.STRING;
    }
    else if (field.type == 'datetime') {
        return DataTypes.DATE;
    }
    else if (field.type == 'date') {
        return DataTypes.DATEONLY;
    }
    else {
        return DataTypes.STRING(field.length);
    }


}

const generateUpdateRecordQuery = (objectName, record) => {

    let value = '';

    Object.keys(record).forEach(key => {
        let val = (record[key]) ? "'" + record[key] + "'" : 'NULL';
        value += `"${key}"=${val},`;
    });
    value += '"LastSyncDate"=CURRENT_TIMESTAMP';

    let query = `UPDATE "${objectName}s" SET ${value} WHERE "Id"='${record.Id}'`;
    return query;
}

const generateCreateRecordQuery = (objectName, record) => {




    let header = '';
    let value = '';

    Object.keys(record).forEach(key => {
        header += `"${key}",`;
        let val = (record[key]) ? "'" + record[key] + "'" : 'NULL';
        value += `${val},`;
    });
    header += '"LastSyncDate"';
    value += 'CURRENT_TIMESTAMP';
    let query = `INSERT INTO "${objectName}s" (${header}) VALUES (${value}) ON CONFLICT ("Id") DO NOTHING `;


    return query;

}

module.exports = {
    generateCreateTableQuery,
    generateCreateRecordQuery,
    generateUpdateRecordQuery
}