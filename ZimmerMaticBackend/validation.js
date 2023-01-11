const Joi = require('joi');

const register_validation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string().min(4).required(),
        name: Joi.string(),
        role: Joi.string().required()
    })
    return schema.validate(data)
}
exports.register_validation = register_validation;

const login_validation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string().min(4).required(),
    })
    return schema.validate(data)
}
exports.login_validation = login_validation;

const pw_validation = data => {
    const schema = Joi.object({
        password: Joi.string().min(4).required(),
    })
    return schema.validate(data)
}
exports.pw_validation = pw_validation;

const username_validation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
    })
    return schema.validate(data)
}
exports.username_validation = username_validation;