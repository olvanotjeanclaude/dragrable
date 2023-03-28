/* server.js - Express server*/
'use strict';
const log = console.log

const express = require('express')
const app = express();
const path = require('path');

// serve access to /pub
app.use(express.static(path.join(__dirname, '/pub')))


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})
