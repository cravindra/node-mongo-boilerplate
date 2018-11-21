const jwt = require('jsonwebtoken');

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, _config.jwt.secret, function (err, decoded) {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = (req, res, next) => {
    const {token} = req.allParams();
    if (!token) {
        return res.error(401);
    }
    verifyToken(token)
        .then(decoded => {
            req.decodedToken = decoded;
            next();
        })
        .catch(err => res.error(400, {info: err}));
};