const express = require('express');
const router = express.Router();
const { User, Auth } = _models;
// Login
router.post('/login', (req, res) => {
    // Validations 
    Auth.login(req.body)
        .then((auth) => {
            res.ok(auth)
        })
        .catch(err => res.error(400, { info: err, message: 'Invalid username or password' }));
});

// Sign Up
router.post('/signup', (req, res) => {
    const { password } = req.body;
    delete req.body.password;
    let user;
    // Validations 
    User.create(req.body)
        .then(data => {
            user = data;
            // var password = bcrypt.genSalt(10, function(err, salt) {
            //     bcrypt.hash("B4c0/\/") 
            // });
            return Auth.create({ password, user: user._id, lastLogin: new Date() })
        })
        .then(() => res.ok(201, { data: user }))
        .catch(err => res.error(400, { info: err, message: 'Bad request' }));
});
// Reset Password

// Forgot Password


module.exports = router;