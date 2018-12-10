const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.register = function(app) {
    app.post('/dashboard/page/lunch/:year/:month/:day/do/update', async (req, res) => {
        const token = req.body._a;

        try {
            const date = new Date(req.param('year'), req.param('month') - 1, req.param('day'));

//            const account = await require(`${ global.__interface }/portal/auth/auth-token`).validate(token); 
//
//            const hasPermission = await require(`${ global.__interface }/portal/account/account-modules`).hasModule(account, 'lunch');
//
//            if (!hasPermission) {
//                res.json({
//                    error: 'You do not have permission.',
//                    redirect: true
//                });
//                return;
//            }

            const title = req.body.submit.title;
            const items = req.body.submit.items;

            try {
                const complication = await require(`${ global.__interface }/day/retrieve-day`).updateComplication(date, 'lunch', {
                    title: title,
                    items: items
                });
                
                res.json({
                    index: {
                        success: true
                    }
                });
            } catch (err) {
                res.status(500);
                
                res.json({
                    error: 'Invalid data formatting.'
                });
            }
        } catch (err) {
            console.log(err);

            res.status(500);

            // Account validation issue
            if (err.invalid) {
                res.json({
                    error: err.message,
                    redirect: true
                });
                return;
            }

            // Other internal error
            res.json({
                error: 'An internal error occurred.'
            });
        }
    });
}