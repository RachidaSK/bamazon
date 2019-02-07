$(function () {
    $.ajax({
        method: "GET",
        url: "/api/products"
    }).then(function (data) {
        console.log(data)
        const showProducts = function () {
            $("#welcome").addClass("hide");
            $(".addPdt-view").addClass("hide");
            $(".inventory-view").addClass("hide");
            $(".addStock-view").addClass("hide");
            $(".pdt-view").removeClass("hide");

            $(".pdt-view").append(`<h5 class="mt-3">Products For Sale</h5> 
                                   <div class="row">
                                        <div class="col-md-8 mx-auto">
                                            <table class="table table-bordered table-hover mt-4 man-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="pdt-table"></tbody>

                                            </table>
                                        </div>
                                   </div>

           `);
            for (let i = 0; i < data.length; i++) {
                $("#pdt-table").append(`<tr>
                                            <th scope="row" class="text-center">${data[i].id}</th> 
                                            <td>${data[i].product_name}</td>
                                            <td>$${data[i].price}</td>
                                            <td class="text-center">${data[i].stock_quantity}</td>
                                        </tr>`)

            }
        }
        $("#pdtsale-btn").on("click", showProducts);

        const newProduct = function () {
            $("#welcome").addClass("hide");
            $(".pdt-view").addClass("hide");
            $(".inventory-view").addClass("hide");
            $(".addStock-view").addClass("hide");
            $(".addPdt-view").removeClass("hide");

            $(".addPdt-view").append(`<p>Please click <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter" id="addStock-btn">Here</button>to add a new product to the stock</p>
                                      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalCenterTitle">Add New Product</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <div class="form-group">
                                                            <label for="pdtName">Name</label>
                                                            <input type="text" class="form-control inputField" id="pdtName">
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="pdtDpt">Department</label>
                                                            <input type="text" class="form-control inputField" id="pdtDpt">
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="pdtPrice">Price ($)</label>
                                                            <input type="text" class="form-control inputField" id="pdtPrice">
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="pdtQty">Quantity</label>
                                                            <input type="text" class="form-control inputField" id="pdtQty">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" id="modalAdd-btn">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                      </div>`);



            const addProduct = function () {
                const name = $("#pdtName").val();
                const department = $("#pdtDpt").val().trim();
                const price = $("#pdtPrice").val().trim();
                const quantity = $("#pdtQty").val().trim();

                $.post("/api/products/", {
                    product_name: name,
                    department_name: department,
                    price: price,
                    stock_quantity: quantity
                }).then(function (data) {
                    $(".addPdt-view").append(`<p><i>Item has been successfully added</i></p>`)
                })
            }

            $("#modalAdd-btn").on("click", addProduct);

        }
        $("#addPdt-btn").on("click", newProduct);

        const showLowInventory = function () {
            $("#welcome").addClass("hide");
            $(".pdt-view").addClass("hide");
            $(".addPdt-view").addClass("hide");
            $(".addStock-view").addClass("hide");
            $(".inventory-view").removeClass("hide");


            $(".inventory-view").append(`<p>Please find below low inventories</p>
                                          <div class="row">
                                            <div class="col-md-8 mx-auto">
                                                <table class="table table-bordered mt-4">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Product</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="inv-table"></tbody>
                                                </table>
                                            </div>
                                         </div>`)
            for (let i = 0; i < data.length; i++) {
                if (data[i].stock_quantity < 15) {
                    $("#inv-table").append(`<tr>
                                                <th scope="row" class="text-center">${data[i].id}</th> 
                                                <td>${data[i].product_name}</td>
                                                <td>$${data[i].price}</td>
                                                <td class="text-center">${data[i].stock_quantity}</td>
                                            </tr>`)

                }
            }
        }
        $("#viewInvent-btn").on("click", showLowInventory);

        const updateStock = function () {
            $("#welcome").addClass("hide");
            $(".pdt-view").addClass("hide");
            $(".addPdt-view").addClass("hide");
            $(".inventory-view").addClass("hide");
            $(".addStock-view").removeClass("hide");

            $(".addStock-view").append(`<p class="mt-4">Welcome! You can "add more" or "remove some" of any item in the stock </p>
                                        <div class="row">
                                            <div class="col-md-8 mx-auto">
                                                <table class="table table-bordered mt-4">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Product</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Update Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="stock-table"></tbody>
                                                </table>
                                            </div>
                                        </div>`)

            for (let i = 0; i < data.length; i++) {
                $("#stock-table").append(`<tr>
                                            <th scope="row" class="text-center">${data[i].id}</th> 
                                            <td>${data[i].product_name}</td>
                                            <td>$${data[i].price}</td>
                                            <td class="text-center">${data[i].stock_quantity}</td>
                                            <td class="text-center"> 
                                                <form>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control mx-auto stock-quantity" id="quantityUpInput${i}">
                                                    </div> 
                                                    <button type="button" class="btn btn-danger stock-btn minusBtn" id="minus${i}"><i class="fas fa-minus-square"></i></button>
                                                    <button type="button" class="btn btn-success stock-btn" id="add${i}"><i class="fas fa-plus-square"></i></button>
                                                    
                                                </form>
                                            </td>
                                        </tr>`)



                const quantityAdd = function () {
                    const updateQuantity = $(`#quantityUpInput${i}`).val();
                    const stockQty = data[i].stock_quantity;

                    //Update the stock
                    const newStock = stockQty + parseInt(updateQuantity);
                    data[i].stock_quantity = parseInt(newStock);

                    $.ajax(`/api/products/${data[i].id}`, {
                        method: "PUT",
                        contentType: 'application/json',
                        processData: false,
                        data: JSON.stringify(data[i])
                    }).then(function () {
                        $(`#quantityUpInput${i}`).val('');
                    });
                }

                const quantityMinus = function () {
                    const updateQuantity = $(`#quantityUpInput${i}`).val();
                    const stockQty = data[i].stock_quantity;

                    //Update the stock
                    const newStock = stockQty - parseInt(updateQuantity);
                    data[i].stock_quantity = parseInt(newStock);

                    $.ajax(`/api/products/${data[i].id}`, {
                        method: "PUT",
                        contentType: 'application/json',
                        processData: false,
                        data: JSON.stringify(data[i])
                    }).then(function () {
                        $(`#quantityUpInput${i}`).val('');
                    });
                }

                $(`#minus${i}`).on("click", quantityMinus)
                $(`#add${i}`).on("click", quantityAdd)

            }


        }
        $("#updateStock-btn").on("click", updateStock);

    })

});