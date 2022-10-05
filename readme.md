# Description

Node Server to create backup of salesforce records

# ENV Variables

SF_USERNAME= salesforce user name
SF_PASSWORD= salesforce password
SF_SECURITY_TOKEN= salesforce security token
SF_CLIENT_ID= salesforce connected app client id
SF_CLIENT_SECRET= salesforce connected app client secret
SF_ENV= salesforce environment to connect ( production || sandbox )
SF_API_VER=55.0 - salesforce API version

PORT=3000 - port for node

PG_DATABASE_URL= complete postgress database url

# Apis

1. salesforce/getAllObjects - returns list of all salesforce objects
2. salesforce/getSingleObject/:objectApiName - returns list of all fields of salesforce object
3. database/syncsObjectRecords/:sObjectApiName -(async) starts syncing of records from salesforce database to postgress database
4. schema/setupDefaultSchema - creates default tables in postgress database that are needed for operations 
    a. Objects - table stores objects name and status of sync of custom fields 
5. schema/syncAllSObjectNames - syncs all salesforce objects names into Object table of postgress database
6. schema/getAllObjects - returns list of all salesforce objects that are stored in postgress database
7. schema/syncsObjects/:sObjectApiName - creates a table in postgress for defined object where records can be synced
