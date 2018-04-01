
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URI || 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

routes(app, db);



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


