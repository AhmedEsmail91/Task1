import Joi from 'joi'
// SR_U_D_categoryValidation : SR:single Read, U:Update, D:Delete
export const updateCategoryValidation = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
});
export const show_deleteValidation= Joi.object({
    id: Joi.string().required(),
});
export const CreateCategoryValidation = Joi.object({
    name: Joi.string().required(),
});

