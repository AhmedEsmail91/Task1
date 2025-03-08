import { productModel } from "./../../../database/models/product.model.js";
import { categoryModel } from "./../../../database/models/category.model.js";
import {catchError} from "./../../middlewares/catchError.js";
import { Op } from "sequelize";
import AppError from "../../utils/AppError.js";

export const getProductById = catchError(async (req, res, next) => {
    const product = await productModel.findByPk(req.params.id,{
        include: [{
            model: categoryModel,
            attributes: ['name']
        }],
        attributes: { exclude: ['category_id'] }
    });
    if (product) {
        res.status(200).json(product);
    } else {
        next(new AppError("Product not found", 404));
    }
});

export const getAllProducts = catchError(async (req, res, next) => {
    const products = await productModel.findAll({
        include: [{
            model: categoryModel,
            attributes: ['name']
        }],
        attributes:{exclude:['category_id']}
    });
    if(products&&products.length>0){
        res.status(200).json(products);
    }
    else{
        next(new AppError("No products found", 404));
    }
});

export const createProduct = catchError(async (req, res, next) => {
    const category = await categoryModel.findByPk(req.body.category);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    req.body.category_id = req.body.category;
    delete req.body.category;
    const existingProduct = await productModel.findOne({ where: { name: req.body.name } });
    if (existingProduct) {
        return next(new AppError("Product name must be unique", 400));
    }
    const product = await productModel.create(req.body);
    res.status(201).json({ message: "Product created successfully", product });
});

export const updateProduct = catchError(async (req, res, next) => {
    // Check if the category exists
    if (req.body.category) {
        const category = await categoryModel.findByPk(req.body.category);
        if (!category) {
            return next(new AppError("Category not found", 404));
        }
        req.body.category_id = req.body.category;
        delete req.body.category;
    }

    // Check if the product exists
    const product = await productModel.findByPk(req.params.id);
    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    // Check for name uniqueness
    const existingProduct = await productModel.findOne({
        where: { name: req.body.name, id: { [Op.ne]: req.params.id } },
    });
    if (existingProduct) {
        return next(new AppError("Product name must be unique", 400));
    }

    // Perform the update
    await product.update(req.body);

    res.status(200).json({ message: "Product updated successfully" });
});


export const deleteProduct = catchError(async (req, res, next) => {
    const result = await productModel.destroy({ where: { id: req.params.id } });
    if (result) {
        res.status(200).json({ message: "Product deleted successfully" });
    } else {
        next(new AppError("Product not found", 404));
    }
});


