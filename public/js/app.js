$(function () {
    $.ajax({
        method: "GET",
        url: "/api/products"
    }).then(function (data) {
        console.log(data);


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
                                           <h1 class='ml-3 product-name'>${data[i].product_name}</h1>
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

            const run = function () {
                const buyQuantity = $(`#item-qty${i}`).val();
                const stockQuantity = $(`#stock-qty${i}`).val();

                const newStock = stockQuantity - buyQuantity;

                console.log(buyQuantity);
                console.log(stockQuantity);
                console.log(newStock);
        
            }
            $(`#btn${i}`).on("click", run);
        }
        
    });
});