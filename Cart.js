const token = localStorage.getItem("token");

async function loadCart(){

const response = await fetch(

`${API_URL}/api/cart`,

{

headers:{

Authorization:

"Bearer "+token

}

}

);

const cart = await response.json();

displayCart(cart);

}

function displayCart(cart){

const container =

document.getElementById(

"cartContainer"

);

container.innerHTML="";

let total=0;

cart.cartItems.forEach(item=>{

total+=

item.product.price;

container.innerHTML+=`

<div class="card">

<img src=
"${API_URL}/uploads/${item.product.imageUrl}">

<h3>

${item.product.name}

</h3>

<p>

₹${item.product.price}

</p>

<button

onclick="removeItem(${item.id})">

Remove

</button>

</div>

`;

});

document.getElementById(

"totalPrice"

).innerText=

"Total : ₹"+total;

}

async function removeItem(id){

await fetch(

`${API_URL}/api/cart/remove/${id}`,

{

method:"DELETE",

headers:{

Authorization:

"Bearer "+token

}

}

);

loadCart();

}

function goCheckout(){

window.location.href=

"checkout.html";

}

function goHome(){

window.location.href=

"user.html";

}

loadCart();