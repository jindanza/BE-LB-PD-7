module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        store_name: {
            type: Sequelize.STRING
        },
        product_name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        discount: {
            type: Sequelize.INTEGER
        },
        sold: {
            type: Sequelize.INTEGER
        },
        rating: {
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.STRING
        },
        pre_order: {
            type: Sequelize.BOOLEAN
        },
        pdn: {
            type: Sequelize.BOOLEAN
        },
        pkp: {
            type: Sequelize.BOOLEAN
        },
        tkdn: {
            type: Sequelize.INTEGER
        },
        promo: {
            type: Sequelize.BOOLEAN
        },
        image: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamp: true,
        tableName: "products"
    });

    return Product
}