const express = require('express');


const dotenv = require('dotenv');
dotenv.config();


const Salesforce = require('./externalService/salesforce');
const Database = require('./externalService/postgress');
const logger = require('./utility/logger')


const port = process.env.PORT || 5000;

const app = express()
app.use(express.json());
app.use(logRequest)
function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}



app.use('/', require('./routes/routerIndex'));
app.use('/salesforce', require('./routes/routerSalesforce'));
app.use('/schema', require('./routes/routerSchema'));
app.use('/database', require('./routes/routerDatabase'));
app.use('*', require('./routes/routerDefault'));



 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    global.isSfConnect = false;
    global.isDBConnect = false;
    establishConnections();
})


async function establishConnections() {
    //postgress cursor is stored in global.db
    global.db = new Database();
    global.isDBConnect = true;
    //sf connection cursor is stored in global.sf
    global.sf = await new Salesforce().connect();
    global.isSFConnect = true;

}
