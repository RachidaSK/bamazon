module.exports = function (sequelize, Datatypes) {
    const Product = sequelize.define("Product", {
        product_name: {
            type: Datatypes.STRING,
            validate: {
                len: [2, 50],
                // notNull: true
            }
        },
        department_name: {
            type: Datatypes.STRING,
            validate: {
                len: [2, 30],
                // notNull: true
            }
        },
        price: {
            type: Datatypes.FLOAT,
            validate: {
                isNumeric: true,
                isFloat: true,
                // notNull: true,
                isPositive(value) {
                    if(parseFloat(value) < 0){
                        throw new Error ('Only positive values are allowed')
                    }
                }

            }
        },
        stock_quantity: {
            type: Datatypes.INTEGER,
            Validate: {
                isNumeric: true,
                isInt: true,
                // notNull: true,
                min: 0,
            }

        }
    });
    return Product;
}