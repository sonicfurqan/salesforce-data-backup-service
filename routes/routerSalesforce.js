const express = require('express');
const router = express.Router();
const path = require('path');


const salesforceMetadata = require('../service/salesforceService');

router.get('/getAllObjects', salesforceMetadata.getAllObjects);

router.get('/getSingleObject/:objectApiName', salesforceMetadata.getSingleObject);

module.exports = router;
