# bamazon

## Overview

Bamazon is an e-commerce application where users can buy items. The web app will take in orders from customers and deplete stock from the store's inventory. 
Bamazon displays two pages (the "Manager View" and the "Customer View").

## About Bamazon

### Customer View

Bamazon displays a list of products available to purchase and the price. Customers are able to select an item and specify the quantity, and then submit the order.
Once the customer has placed the order, the web app check if the store has enough of the product to meet the customer's request.

* If not, the app displays an error message, and then prevent the order from going through.

* However, if the store does have enough of the product, the customer's order is fulfilled and the stock quantity is updated. Then the customer can click on the View Cart button to view the selected items and the total cost of their purchase.

### Manager View

The page displays a set of menu options:

* Products:
   * View Products for Sale: it lists every available item in the store.
   * Add  New Product: it displays an input field to allow the manager to add a completely new Product.

* Inventory
   * View Low Inventory: It lists all items with an inventory count lower than five.
   * Update Inventory: It displays an input field that will let the manager "add more" by clicking on the "+" button or "decrease the stock" by clicking on the "-" button.


## Technologies Used

* HTML5.
* CSS3.
* Bootstrap.
* JavaScript.
* jQuery/Ajax.
* MySQL.
* Node.js.
* RESTful APIs.

