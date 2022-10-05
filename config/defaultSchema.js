const { DataTypes } = require('sequelize');


createSupportTables = async () => {
    let Object = global.db.sequelize.define('Objects', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            unique: true,

        },
        label: {
            type: DataTypes.STRING(255),
        },
        isCustom: {
            type: DataTypes.BOOLEAN,
        },
        associateEntityType: {
            type: DataTypes.STRING(255),
        },
        isSynced: {
            type: DataTypes.BOOLEAN,
        },
        syncedDate: {
            type: DataTypes.DATE,
        }
    }, {
        timestamps: false
    });

    let SyncLog= global.db.sequelize.define('SyncLog', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
        },
        type: {
            type: DataTypes.STRING(255),
        },
        operation: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.STRING(255),
        },
        count: {
            type: DataTypes.INTEGER,
        },
        createdDate: {
            type: DataTypes.DATE,
        }
    }, {
        timestamps: false
    });

    let objectResponse = await Object.sync();
    let syncLogResponse = await SyncLog.sync();
    console.log('Created Table : ', objectResponse);
    console.log('Created Table : ', syncLogResponse);

}

module.exports = {
    createSupportTables
}