const logger = require("../utility/logger");

//returns all  object names
const getAllSObjects = async () => {
    let objects = await global.sf.describeAllSObjects();

    let sObjectList = objects.sobjects.map(sObject => {
        return {
            name: sObject.name,
            label: sObject.label,
            isCustom: sObject.custom,
            associateEntityType: sObject.associateEntityType,
            isQueryable: sObject.isQueryable,
        }
    });
    return sObjectList;
}

//returns fields of object
const getDescribeSObjects = async (objectApiName) => {
    let objects = await global.sf.describeSObject(objectApiName);

    let objectFields = objects.fields.map(field => {
        return {
            autoNumber: field.autoNumber,
            custom: field.custom,
            digits: field.digits,
            externalId: field.externalId,
            filterable: field.filterable,
            idLookup: field.idLookup,
            label: field.label,
            length: field.length,
            name: field.name,
            nillable: field.nillable,
            precision: field.precision,
            scale: field.scale,
            type: field.type,
            unique: field.unique,
            isCompound: (field.type == 'address') ? true : false
        }
    })
    return objectFields;

}


module.exports = {
    getAllSObjects,
    getDescribeSObjects
}