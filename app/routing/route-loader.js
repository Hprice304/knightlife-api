const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

module.exports.init = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(require('cors')());
    
    // Only redirect to HTTPS when allowed
    if (process.env.ENFORCE_HTTPS) {
        app.use(require('express-sslify').HTTPS({ trustProtoHeader: true }));
    }

    register(app);
    
    var port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log("Listening on port: " + port);
    });
};

function register(app) {
    // Auth
    require('./routes/portal/auth/post-submit-login').register(app);
    require('./routes/portal/auth/post-retrieve-session-validation').register(app);

    require('./routes/portal/auth/google/post-retrieve-google-redirect').register(app);
    require('./routes/portal/auth/google/post-submit-google-login').register(app);

    // Dashboard
    require('./routes/portal/dashboard/post-retrieve-page-home').register(app);
    
    // Lunch
    require('./routes/portal/dashboard/lunch/post-retrieve-page-lunch').register(app);
    require('./routes/portal/dashboard/lunch/post-retrieve-food-suggestions').register(app);
    require('./routes/portal/dashboard/lunch/post-submit-data-lunch').register(app);
    require('./routes/portal/dashboard/lunch/post-submit-hide-suggestion').register(app);

    // App
    require('./routes/application/day/post-retrieve-day').register(app);
}