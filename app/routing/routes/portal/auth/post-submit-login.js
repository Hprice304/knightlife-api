const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.register = (app) => {
    app.post('/p/do/auth/login', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const account = await require(`${ global.__interface }/portal/auth/auth-handle-login`).validate(username, password); 
            const token = require(`${ global.__interface }/portal/auth/auth-token`).generate(account);

            res.json({
                index: {
                    _a: token 
                }
            });
        } catch (err) {
            console.log(err);
            
            res.status(500);

            // Account validation issue
            if (err.invalid) {
                res.json({
                    error: err.message
                });
                return;
            }

            // Other internal error
            res.json({
                error: 'An internal error occurred.'
            });
        }
    });
};