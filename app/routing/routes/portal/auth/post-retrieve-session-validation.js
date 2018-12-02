const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.register = (app) => {
    app.post('/dashboard/do/auth/session/validate', async (req, res) => {
        const token = req.body._a;

        try {
            const account = await require(`${ global.__interface }/auth/validate-token`).validate(token); 

            res.json({
                index: {
                    valid: token
                }
            });
        } catch (err) {
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