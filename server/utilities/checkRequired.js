/**
 * @file Checks if all required fields are in a request
 * @copyright Matthew Gallant
 */

/**
 * Checks if an array of required fields in in an express request
 * 
 * @param {Array} fields The field names to check if they exist on the request
 * @param {Object} req An express request object
 * @param {Object} res An express response object
 */
const checkRequired = (fields, req, res) => {
    fields.forEach(field => {
        if (!req.body[field]) {
            res.status(400)
            throw new Error('Not all required fields were provided. Check your submission and try again.')
        }
    })
}

module.exports = checkRequired
