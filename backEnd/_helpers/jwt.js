const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
    const { secret } = {"secret": "my-secret"};
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/authenticate'
        ]
    });
}