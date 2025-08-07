const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.BD_HOST,
        dialect: "postgres",
        logging: true,
        define: {
            // timestamps: true,
            // paranoid: true,
            underscored: true
        }
    }
)
