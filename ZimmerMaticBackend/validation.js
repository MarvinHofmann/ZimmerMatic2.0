const Joi = require('joi');

const register_validation = data =>{
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

const login_validation = data =>{
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