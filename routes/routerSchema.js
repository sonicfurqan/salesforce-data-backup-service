const express = require('express');
const router = express.Router();
const path = require('path');


const databaseSchema = require('../service/schemaService');

router.get('/setupDefaultSchema', databaseSchema.setupDefaultSchema);

router.get('/syncAllSObjectNames', databaseSchema.syncAllSObjectNames);

router.get('/getAllObjects', databaseSchema.getAllObjects);

router.get('/syncsObjects/:sObjectApiName', databaseSchema.syncSObject);

module.exports = router;
