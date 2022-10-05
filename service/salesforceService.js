const { getAllSObjects, getDescribeSObjects } = require('../controller/salesforceSchema');

exports.getAllObjects = async (req, res, next) => {
    if (!global.isSFConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }

    let objects = await getAllSObjects();
    res.send(objects);

};

exports.getSingleObject = async (req, res, next) => {
    if (!global.isSFConnect) {
        res.status(409).send('Connection error. Please try later.');
        return;
    }
    let objectApiName = req.params.objectApiName;
    let objects = await getDescribeSObjects(objectApiName);
    res.send(objects);



}  