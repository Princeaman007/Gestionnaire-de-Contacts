
const ErrorResponse = require('../utils/errorResponse');

/**

 * @param {Object} schema - 
 * @param {string} source 
 * @returns {Function} 
 */
const validate = (schema, source = 'body') => (req, res, next) => {
  const data = req[source];

  if (!schema || typeof schema.validate !== 'function') {
    return next(
      new ErrorResponse(
        `Schéma de validation invalide. Un schéma Joi est requis.`,
        500
      )
    );
  }

  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message).join(', ');
    return next(new ErrorResponse(errorDetails, 400));
  }

  next();
};

module.exports = validate;