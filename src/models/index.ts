import configs from '../configs';
import {Sequelize} from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';
const config = configs.db[env];

const sequelize =  new Sequelize({
    ...config,
    models: [__dirname + '/**/*.model.js'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});

export default sequelize;