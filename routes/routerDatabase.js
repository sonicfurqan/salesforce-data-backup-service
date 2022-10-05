const express = require('express');
const router = express.Router();
const path = require('path');


const databaseSync = require('../service/databaseService');

router.get('/syncsObjectRecords/:sObjectApiName', databaseSync.syncsObjectRecords);

module.exports = router;
