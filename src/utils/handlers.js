import { catchError } from '../middlewares/catchError.js';
import connection from '../database/dbConnection.js';

const findAll = async (dbModel) => {
    try {
        const results = await dbModel.find();
        return results;
    } catch (error) {
        throw new Error(`Error finding all documents: ${error.message}`);
    }
};

const findOne = async (dbModel, query) => {
    try {
        const result = await dbModel.findOne(query);
        return result;
    } catch (error) {
        throw new Error(`Error finding one document: ${error.message}`);
    }
};

const deleteOne = async (dbModel, query) => {
    try {
        const result = await dbModel.deleteOne(query);
        return result;
    } catch (error) {
        throw new Error(`Error deleting one document: ${error.message}`);
    }
};

const insertOne = catchError(async (dbModel, document) => {
    const result = await dbModel.create(document);
    return result;
});

export default {
    findAll,
    findOne,
    deleteOne,
    insertOne
};