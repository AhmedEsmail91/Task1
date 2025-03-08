import express from 'express';
import validation from '../../middlewares/validation.js';
import { updateCategoryValidation, CreateCategoryValidation, show_deleteValidation } from './category.validation.js';
import{ getCategoryById, getAllCategories, deleteCategory,createCategory,updateCategory, getCategoryProducts } from './category.controller.js';

const categoryRouter = express.Router();
categoryRouter.route('/')
    .get(getAllCategories)
    .post(validation(CreateCategoryValidation), createCategory);

categoryRouter
    .route('/:id')
    .get(validation(show_deleteValidation), getCategoryById)
    .put(validation(updateCategoryValidation), updateCategory)
    .delete(validation(show_deleteValidation), deleteCategory);
// category products
categoryRouter.get('/:id/products', validation(show_deleteValidation), getCategoryProducts);
export default categoryRouter;