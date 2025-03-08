import express from 'express'
import dotenv from 'dotenv'
import {bootstrap} from './src/index.routes.js';
import chalk from 'chalk';
import { connection } from './database/dbConnection.js';
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())
// using bootstrap function to add routes
bootstrap(app);

connection.sync({ alter: true }).then(() => {
    console.log(chalk.blue('DB Connection has been established successfully.'));
}).catch((error) => {
    console.error(chalk.red('Unable to connect to the database:', error));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 