const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user');
const authSchema = new mongoose.Schema({
    password: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {timestamps: true});


authSchema.pre('save', function () {
    if (this.password) {
        return bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                return true;
            });
    }
    return true;
});

function getToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, _config.jwt.secret, {expiresIn: _config.jwt.expiresIn}, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}

authSchema.statics.login = function ({userId, password}) {
    let auth, user, token;
    return User.findOne({$or: [{email: userId}, {mobile: userId}]})
        .exec()
        .then(data => {
            user = data;
            return this.findOne({user: user._id})
                .sort({updatedAt: -1})
                .exec();
        })
        .then(data => {
            auth = data;
            return bcrypt.compare(password, auth.password);
        })
        .then(res => res ? getToken({user}) : Promise.reject())
        .then(data => {
            token = data;
            return auth.update({lastLogin: new Date()});
        })
        .then(() => {
            return {user, token};
        });
};

module.exports = mongoose.model('Auth', authSchema);