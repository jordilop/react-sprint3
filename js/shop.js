// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var totalCountProduct = 0;
let totalCountInner = document.getElementById("count_product");

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    cartList.push(products.find(products => products.id == id));
    console.log(cartList);
}

// Exercise 2
function cleanCart() {
    cartList = [];
    cart = [];
    totalCountProduct = 0;
    totalCountInner.innerHTML = totalCountProduct;
    printCart();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    // let totalPrice = 0;
    // cartList.forEach(function (product) {
    //     totalPrice += product.price;
    // });
    let total = 0;
    cart.forEach(function (product) {
        product.subtotal = product.quantity * product.price;
        product.hasOwnProperty('subtotalWithDiscount') ? total += product.subtotalWithDiscount : total += product.subtotal;
    });
    return(total.toFixed(2));
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    cart = [];

    cartList.forEach(function (product) {
        let index = cart.findIndex(products => products.id == product.id);
        if (index == -1) {
            cart.push({ ...product, quantity: 1 });
        } else {
            cart[index].quantity++;
        }
    });
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    // Si l'usuari compra 3 o més ampolles d'oli, el preu del producte descendeix a 10 euros.
    // Quan es compren 10 o més productes per a fer pastís, el seu preu es rebaixa a 2/3.
    let priceOilOffer = 10;
    let percentCupcakeOffer = 2 / 3;

    cart.forEach(function (product) {
        //Productos en carrito y tienen oferta
        // if (product.offer != undefined && product.offer != null) {
        if(product.hasOwnProperty('offer')) {
            if (product.quantity >= product.offer.number) {
                switch (product.id) {
                    case 1:
                        product.subtotalWithDiscount = product.quantity * priceOilOffer;
                        break;
                    case 3:
                        product.subtotalWithDiscount = product.quantity * product.price * percentCupcakeOffer;
                        break;
                }
            } else {
                delete product.subtotalWithDiscount;
            }
        }
    });
    //console.log(cart);
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    //generateCart();
    
    applyPromotionsCart();

    let cartList = document.getElementById("cart_list");
    let totalPrice = document.getElementById("total_price");
    totalPrice.innerHTML = calculateTotal();
    cartList.innerHTML = "";

    cart.forEach(function (product) {
        let productList = `<tr>
                            <th scope="row">${product.name}</th>`;
        let productSubtotal = product.price * product.quantity;

        if (product.hasOwnProperty('subtotalWithDiscount')) {
            let priceWithDiscount = product.subtotalWithDiscount / product.quantity;

            productList += `<td>${priceWithDiscount.toFixed(2)}
                            <br>
                            <span class="text-decoration-line-through">${product.price}</span></td>
                            <td><a href="javascript:void(0)" onclick="removeFromCart(${product.id});printCart();"><i class="fa fa-minus-square btn" aria-hidden="true"></i></a> ${product.quantity} <a href="javascript:void(0)" onclick="addToCart(${product.id});printCart()"><i class="fa fa-plus-square btn" aria-hidden="true"></i></a></td>
                            <td>${product.subtotalWithDiscount.toFixed(2)}</td>
                            `;
        } else {
            productList += `<td>${product.price}</td>
                            <td><a href="javascript:void(0)" onclick="removeFromCart(${product.id});printCart();"><i class="fa fa-minus-square btn" aria-hidden="true"></i></a> ${product.quantity} <a href="javascript:void(0)" onclick="addToCart(${product.id});printCart()"><i class="fa fa-plus-square btn" aria-hidden="true"></i></a></td>
                            <td>${productSubtotal}</td>
                            `;
        }
        productList += `</tr>`
        cartList.innerHTML += productList;
    });
}


// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    let product = products.find(products => products.id == id);
    let index = cart.findIndex(products => products.id == product.id);
    if (index == -1) {
        cart.push({ ...product, quantity: 1 });
    } else {
        cart[index].quantity++;
    }
    totalCountProduct++;
    totalCountInner.innerHTML = totalCountProduct;
}

// Exercise 9
function removeFromCart(id) {
    let product = cart.find(products => products.id == id);
    product.quantity != 1 ? product.quantity-- : cart.splice(cart.indexOf(product), 1);
    totalCountProduct--;
    totalCountInner.innerHTML = totalCountProduct;
}

function open_modal() {
    console.log("Open Modal");
    printCart();
}