import {categoryModel} from './../../../database/models/category.model.js';
import {catchError} from './../../middlewares/catchError.js';
import AppError from './../../utils/AppError.js';
import {Op} from 'sequelize';
// show single category by id
export const getCategoryById = catchError(async (req, res, next) => {
    const category = await categoryModel.findByPk(req.params.id);
    if (category) {
        res.status(200).json(category);
    } else {
        next(new AppError("Category not found", 404));
    }
});
export const getCategoryProducts=catchError(async(req,res,next)=>{
    const category=await categoryModel.findByPk(req.params.id);
    if(category){
        const products=await category.getProducts();// Lazy loading as the relationship is defined in the model
        res.status(200).json(products);
    }else{
        next(new AppError("Category not found", 404));
    }
})
// show all categories
export const getAllCategories = catchError(async (req, res, next) => {
    const categories = await categoryModel.findAll();
    if(categories && categories.length>0)res.status(200).json(categories);
    else next(new AppError("No categories found", 404));
    
}); 

// Some Additional Functions
// create category
export const createCategory = catchError(async (req, res, next) => {
    const existingCategory = await categoryModel.findOne({ where: { name: req.body.name } });
    if (existingCategory) {
        return next(new AppError("Category name must be unique", 400));
    }
    const category = await categoryModel.create(req.body);
    res.status(201).json(category);
});
// update category
export const updateCategory = catchError(async (req, res, next) => {
    const category = await categoryModel.findByPk(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    const existingCategory = await categoryModel.findOne({
        where: {
            name: req.body.name,
            id: { [Op.ne]: req.params.id }
        }
    });

    if (existingCategory) {
        return next(new AppError("Category name must be unique", 400));
    }

    await category.update(req.body);
    res.status(200).json(category);
    
});
// delete category
export const deleteCategory = catchError(async (req, res, next) => {
    const result = await categoryModel.destroy({ where: { id: req.params.id } });
    if (result) {
        res.status(200).json({ message: "Category deleted successfully" });
    } else {
        next(new AppError("Category not found", 404));
    }
});


 