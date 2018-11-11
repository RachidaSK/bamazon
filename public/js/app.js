$(function () {
    //This function shows the home page
    const showHome = function () {
        $(".home").removeClass("hide");
        $("#cart-view").addClass("hide");
    }

    //This function shows the cart
    const showCart = function () {
        $("#cart-view").removeClass("hide");
        $(".home").addClass("hide");
    }

    //This function rounds the price to 2 decimals

    const roundPrice = function (price) {
        //transform the price to a string
        priceString = `${price}`;
        console.log(priceString);
        if (priceString.includes(".")) {
            const dotIndex = priceString.indexOf(".");
            console.log(dotIndex);
            roundedPrice = priceString.substring(0, dotIndex + 3);
            console.log(roundedPrice);
            priceNumb = parseFloat(roundedPrice);
            console.log(priceNumb);

        }
      return priceNumb;
    }

    //This function handles the GET request
    $.ajax({
        method: "GET",
        url: "/api/products"
    }).then(function (data) {
        console.log(data);
        const shoppingCart = [];

        for (let i = 0; i < data.length; i++) {

            const productCard = $("<div>").addClass("card mt-4");
            // Append bootstrap card-title div to every productcard
            productCard.append(`<div class='card-title'>
                                   <div class='d-flex flex-row bd-highlight justify-content-between'>
                                         <div class='bd-highlight col-5 col-sm-8 col-md-8 item-name'></div>
                                         <div class='bd-highlight  col-2 col-sm-1 col-md-1 pr-1'>
                                            <small>buy</small>
                                         </div>
                                         <div class='bd-highlight text-center col-5 col-sm-3 col-md-2 pl-5'>
                                             <small class='float-right'>in stock</small>
                                         </div>
                                    </div>
                                </div>`);

            // Append the card-body div to every productcard
            productCard.append(`<div class='card-body'>
                                    <div class='d-flex flex-row bd-highlight justify-content-between mb-3'>
                                        <div class='bd-highlight col-5 col-sm-8 col-md-8 item-name'>
                                           <input type='text' readonly class='form-control-plaintext ml-3 product-name' id='item${i}' value="${data[i].product_name}">
                                           <input type='text' readonly class='form-control-plaintext ml-3 product-name' id='price${i}' value='$ ${data[i].price}'>
                                        </div>
                                        <div class='bd-highlight col-2 col-sm-1 col-md-1'>
                                           <form>
                                              <div class='form-group'>
                                                 <input type='text' class='form-control item-quantity'  id='item-qty${i}' placeholder='Qty'>
                                                 <span>
                                                   <button type='button' class='btn btn-light add-cart-btn' data-name='add-btn${i}' id='btn${i}'><i class='fa fa-shopping-cart'></i>ADD</button>
                                                 </span>
                                              </div>
                                            </form>
                                        </div>
                                        <div class='bd-highlight  col-5 col-sm-3 col-md-2 pl-5'>
                                          <input type='text' readonly class='form-control-plaintext text-right' id='stock-qty${i}' value='${data[i].stock_quantity}'>
                                        </div>
                                    </div>
                                </div>`);

            $(".productlist").append(productCard);

            // Add Items to cart on click

            const addtoCart = function () {

                //Grab input values
                const selectedItem = $(`#item${i}`).val();
                const buyQuantity = $(`#item-qty${i}`).val();
                const unitPrice = $(`#price${i}`).val();
                const stockQuantity = $(`#stock-qty${i}`).val();

                //Determine the total price
                const price = unitPrice.slice(2);
                let totalPrice = parseFloat(price) * parseInt(buyQuantity);

                //    let totalString = `${totalPrice}`;

                //     if (totalString.includes(".")) {
                //         const dotIndex = totalString.indexOf(".");
                //         roundedTotal = totalString.substring(0, dotIndex + 3);
                //         totalPrice = parseFloat(roundedTotal);
                //     } 

                totalPrice = roundPrice(totalPrice);
                console.log("This is test" + totalPrice);

                //Clear the input field
                $(`#item-qty${i}`).val('');

                //Update the stock
                const newStock = stockQuantity - buyQuantity;
                data[i].stock_quantity = parseInt(newStock);

                $.ajax(`/api/products/${data[i].id}`, {
                    method: "PUT",
                    contentType: 'application/json',
                    processData: false,
                    data: JSON.stringify(data[i])
                }).then(function () {
                    console.log("success");
                });

                //Create an order object
                const newOrder = {
                    product_name: selectedItem,
                    price: unitPrice,
                    quantity: buyQuantity,
                    totalPrice: totalPrice
                }

                //Push the object to the shopping cart
                shoppingCart.push(newOrder);
                console.log(shoppingCart);



            }
            $(`#btn${i}`).on("click", addtoCart);
        }

        //This function renders the checkout table
        const render = function () {
            showCart();
            const updatedCart = $("<table>").addClass("table table-striped");
            const tableBody = $("<tbody>");
            //Append the checkout table head
            updatedCart.append(`   <thead>
                                         <tr>
                                           <th scope="col">id</th>
                                           <th colspan="2">Item</th>
                                           <th scope="col"></th>
                                           <th scope="col">Unit Price</th>
                                           <th scope="col">Quantity</th>
                                           <th scope="col">Total</th
                                         </tr>
                                       </thead>`);

            // Determine the total and append elements to the table
            let cartTotal = 0;
            for (let i = 0; i < shoppingCart.length; i++) {
                cartTotal += parseFloat(shoppingCart[i].totalPrice);

                //Append the checkout table body
                tableBody.append(` <tr>
                                     <th scope="row">${i + 1}</th>
                                     <td colspan="2">${shoppingCart[i].product_name}</td>
                                     <td scope="col"></td>
                                     <td>${shoppingCart[i].price}</td>
                                     <td>${shoppingCart[i].quantity}</td>
                                    <td>${shoppingCart[i].totalPrice}</td>
                                  </tr>              
             `);


            }
            console.log("This is cart Total" + cartTotal);
            tableBody.append(`<tr>
                                  <td colspan="6">Total</td>
                                  <td>${cartTotal}</td>
                               <tr>`);

            updatedCart.append(tableBody);

            $(".shopping-cart").append(updatedCart);
        }

        $("#cart-btn").on("click", render);


    });
    $("#home-btn").on("click", showHome);
});