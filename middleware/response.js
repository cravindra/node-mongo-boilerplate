/**
 * Middleware which augments the res object
 * @param req - The Express Request Object for the current request
 * @param res - The Express Response Object for the current request
 * @param next
 */
module.exports = (req, res, next) => {
    /**
     * Helper to send a success response
     * Supports the following forms:
     * res.ok() Sends a 200 response with no body
     * res.ok(data) Sends a 200 response with the JSON.stringify-ed version of the data
     * res.ok(status,data) Sends a response with the specified status code and JSON.stringify-ed version of the data
     * @param {Object} [data=''] - The data to be sent as a part of the response
     * @param {Number} [status=500] - The status code of the response
     */
    res.ok = function () {
        switch (arguments.length) {
            case 0:
                res.status(200).send('');
                break;
            case 1:
                res.status(200).json(arguments[0]);
                break;
            default:
                res.status(arguments[0]).json(arguments[1]);
        }
    };


    /**
     * Helper to send an error response
     * Supports the following forms:
     * res.error() Sends a 500 error
     * res.error(status) Sends an error response with the specified status and the default message for that status (if available)
     * res.error(status,{message, *}) Sends an error response with the specified status code and the specified data
     * @param {string} [message=''] - The message to be sent as a part of the error response
     * @param {Number} [status=500] - The status code of the response
     */
    res.error = function () {
        const getMessage = code => {
            const map = {
                400: 'Bad Request',
                401: 'Unauthorised',
                404: 'Not Found',
                500: 'Server Error'
            };
            return map[code] || map[500];
        };
        switch (arguments.length) {
            case 0:
                res.status(500).json({error: {code: 500, message: getMessage(500)}});
                break;
            case 1:
                res.status(arguments[0]).json({error: {code: arguments[0], message: getMessage(arguments[0])}});
                break;
            default:
                res.status(arguments[0]).json({error: {code: arguments[0], ...arguments[1]}});
        }
    };
    next();
};