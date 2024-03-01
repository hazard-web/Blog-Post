const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Blog = sequelize.define('blog', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true

    },
    
    blogtitle: {
        type: Sequelize.STRING,  //VARCHAR(225)
        allowNull: false
    },

    blogauthor: {
        type: Sequelize.STRING,
        allowNull: false

    },
    
    blogcontent:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Blog;