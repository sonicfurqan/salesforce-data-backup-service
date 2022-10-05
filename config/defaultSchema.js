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

    let objectResponse = await Object.sync();
    console.log('Created Table : ', objectResponse);

}

module.exports = {
    createSupportTables
}