const {check} = require('express-validator')

/*This is an array of middleware functions that are validating the request data, and appending an errors object to the req with the results
For signup you want to validate: name, email and password
For signin you want to validate: email and password
*/
exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
];

exports.userSigninValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
];