import { globalError } from './middlewares/globalError.js';
import productRoutes from './modules/product/product.routes.js'
import categoryRoutes from './modules/category/category.routes.js'
import {getCategoryProducts} from './modules/category/category.controller.js'
export const bootstrap=(app)=>{
    app.use('/products',productRoutes);
    app.use('/categories',categoryRoutes);
    app.use('*',(req,res,next)=>{
        res.status(404).json({message:"Page not found (Wrong URL)"});
    })
    app.use(globalError);
} 