import express from 'express';
import  { getProductById, getAllProducts, deleteProduct,createProduct,updateProduct } from './product.controller.js';
import validation from './../../middlewares/validation.js';
import { createProductValidation,updateProductValidation, SR_D_productValidation } from './product.validation.js';
const productRouter = express.Router();
productRouter
    .route('/')
        .get(getAllProducts)
        .post(validation(createProductValidation), createProduct);
productRouter
    .route('/:id')
        .get(validation(SR_D_productValidation),getProductById)
        .put(validation(updateProductValidation),updateProduct)
        .delete(validation(SR_D_productValidation),deleteProduct);

export default productRouter;