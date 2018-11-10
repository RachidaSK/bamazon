$(function () {
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

                //Clear the input field
                $(`#item-qty${i}`).val('');

                //Create an order object
                const newOrder = {
                   product_name: selectedItem,
                   price: unitPrice,
                   quantity: buyQuantity
                }

                //Push the object to the shopping cart
                shoppingCart.push(newOrder);

                const newStock = stockQuantity - buyQuantity;

                //Update the stock
                data[i].stock_quantity = parseInt(newStock);
                
                
                
                $.ajax(`/api/products/${data[i].id}`, {
                    method: "PUT",
                    contentType: 'application/json',
                    processData: false,
                    data: JSON.stringify(data[i])
                }).then(function(){
                    console.log("success");
                })


                console.log(selectedItem);
                console.log(buyQuantity);
                console.log(stockQuantity);
                console.log(newStock);
                console.log(unitPrice);
                console.log(newOrder);
                console.log(shoppingCart);
                console.log(data[i]);
                
            }
            $(`#btn${i}`).on("click", addtoCart);
        }
        
    });
});