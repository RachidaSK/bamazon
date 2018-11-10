//Create a product class that can be used to create new products
class Product {
    constructor(name, department, price, stockQuantity) {
        this.product_name = name;
        this.department_name = department;
        this.price = price;
        this.stock_quantity = stockQuantity
    }
}

const computer = new Product("Microsoft Surface Pro 6", "Computers", 1199.00, 60);
const book = new Product("Test-Driven Javascript Development", "Books", 39.99, 45);
const desk = new Product("Dakota L-Shaped Desk", "Home", 77.21, 20);
const bike = new Product("Exercise Bike with Resistance  ME-709", "Sport", 139.00, 70);
const xbox = new Product("Xbox One X 1TB console", "Games", 474.95, 10);
const playdoh = new Product("Play-Doh Sparkle compound", "Toys", 4.99, 100);
const foundation = new Product("Mac Studio Fix Powder Plus Foundation", "Beauty", 49.99, 50);
const tire = new Product("Michelin Defender LTX - 275/55R20", "Tire", 206.99, 25);
const lays = new  Product("Lay's Classic Potato Chips (pack of 50)", "Snacks",16.33, 90);
const b12 = new Product("Vitamin B12 1000 mcg. Softgels 150Ct", "Health", 19.99, 35);

module.exports ={
    computer,
    book,
    desk,
    bike,
    xbox,
    playdoh,
    foundation,
    tire,
    lays,
    b12
}