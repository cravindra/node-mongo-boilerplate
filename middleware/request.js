const merge = require('lodash/merge');
module.exports = (req, res, next) => {
    req.allParams = () => merge({}, req.headers, req.body, req.query);
    next();
};