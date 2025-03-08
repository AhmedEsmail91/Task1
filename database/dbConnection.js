import Sequelize from 'sequelize'
import chalk from 'chalk'
const  connection = new Sequelize('Task', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
connection.authenticate().then(() => {
  console.log(chalk.blue('DB Connection has been established successfully.'));
}).catch((error) => {
  console.error(chalk.red('Unable to connect to the database:', error));
});

export{connection}
 