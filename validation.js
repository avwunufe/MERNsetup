const Joi = require('@hapi/joi');

const registerValidation = data => {
    const joiSchema = Joi.object().keys({
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Email: Joi.string().email().required().min(6),
        Password: Joi.string().required().min(6),
        role: Joi.string().required()
    });
    return joiSchema.validate(data);
};

const loginValidation = data => {
    const joiSchema = Joi.object().keys({
        Email: Joi.string().email().required().min(6),
        Password: Joi.string().required().min(6)  
    });
    return joiSchema.validate(data);
};




module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation

