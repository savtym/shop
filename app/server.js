
const db = require('./db');
const routes = require('./routes');

const express = require('express');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();


app.use(bearerToken());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app, db);



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


