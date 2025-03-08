import Joi from 'joi'
export const createProductValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.number().required(),
})
export const updateProductValidation = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.number().required(),
})
//SR :single read
// D: delete
export const SR_D_productValidation = Joi.object({
    id: Joi.number().required(),
})

