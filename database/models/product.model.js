import { DataTypes } from 'sequelize';
import {connection} from '../dbConnection.js';
import {categoryModel} from './category.model.js';

const productModel = connection.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: 'No description', length: 1000 },
    category_id: { 
        type: DataTypes.INTEGER, 
        references: { model: categoryModel, key: 'id' }
    }
}, { timestamps: false });

productModel.belongsTo(categoryModel, { foreignKey: 'category_id', onDelete: 'CASCADE' });
categoryModel.hasMany(productModel, { foreignKey: 'category_id', onDelete: 'CASCADE' });

export  {productModel};
