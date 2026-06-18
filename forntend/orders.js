const token = localStorage.getItem("token");

loadOrders();

function loadOrders() {

fetch(

`${API_URL}/api/order/my-orders`,

{

headers:{

Authorization:"Bearer " + token

}

}

)

.then(res=>res.json())

.then(data=>displayOrders(data));

}

function displayOrders(orders){

const container=

document.getElementById(

"ordersContainer"

);

container.innerHTML="";

if(orders.length===0){

container.innerHTML=

"<h2>No Orders Found</h2>";

return;

}

orders.forEach(order=>{

let productHtml="";

if(order.product){

productHtml=`

<div class="product-box">

<img

src="${API_URL}/uploads/${order.product.imageUrl}"

class="product-image">

<h3>${order.product.name}</h3>

<p>Brand : ${order.product.brand}</p>

<p>₹ ${order.product.price}</p>

</div>

`;

}

else{

productHtml=`

<div class="product-box">

<h4>No Product Information</h4>

</div>

`;

}

const card=

document.createElement("div");

card.className=

"order-card";

card.innerHTML=`

<h3>Order #${order.id}</h3>

<p>Status : ${order.status}</p>

<p>Total : ₹ ${order.totalAmount}</p>

<p>Date : ${order.orderDate}</p>

<p>Name : ${order.customerName ?? "-"}</p>

<p>Payment : ${order.paymentMethod ?? "-"}</p>

<p>Address : ${order.address ?? "-"}</p>

${productHtml}

${

order.status==="PLACED"

?

`<button onclick="cancelOrder(${order.id})">

Cancel Order

</button>`

:

`<h4 style="color:red">

Cancelled

</h4>`

}

`;

container.appendChild(card);

});

}

function cancelOrder(id){

const confirmCancel=

confirm(

"Are you sure you want to cancel this order?"

);

if(!confirmCancel){

return;

}

fetch(

`${API_URL}/api/order/cancel/${id}`,

{

method:"PUT",

headers:{

Authorization:

"Bearer "+token

}

}

)

.then(()=>{

alert(

"Order Cancelled"

);

loadOrders();

});

}