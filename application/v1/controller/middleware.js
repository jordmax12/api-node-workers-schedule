const { get_api_key } = require('../model/api_key');

exports.authenicate_api_key = async (req, res, next) => {
    const { api_key } = req.headers;
    // NOTE: I usually would use something like Cognito or generate a JWT, but for the sake of time did a simple API key implementation.
    const validate_api_key = await get_api_key(api_key);
    if(validate_api_key.length === 0) {
        res.status(401);
        res.send({
            'message': `api key: ${api_key} either invalid or not provided. please make sure to use a valid api key for this request.`
        })
        return;
    }

    if(!validate_api_key[0].is_valid) {
        res.status(401);
        res.send({
            'message': `api key: ${api_key} has been disabled. please use a valid api key.`
        })
        return;
    }
    next();
}