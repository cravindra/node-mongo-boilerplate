const express = require('express');
const mongoose = require('mongoose');

global._app = express();
global._config = require('./config');
global._models = require('./models');

_app.use(require('./middleware'));
_app.use(require('./routes'));

// Setup DB Connection
mongoose.connect(_config.db.uri, _config.db.options)
    .then(connection => {
        global._db = connection;
        _app.listen(_config.port, () => {
            console.log(`App is running on ${_config.port} in ${_config.env} mode`);
            console.log(JSON.stringify({ _config }));
        });
    })
    .catch(err => {
        console.error('Unable to connect to database. Aborting start up.', err);
    });
