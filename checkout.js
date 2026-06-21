
const token = localStorage.getItem("token");


const productId =
localStorage.getItem("buyNowProductId");

document
.getElementById("checkoutForm")

.addEventListener(
"submit",

function(e){

e.preventDefault();

const data = {

customerName:
document.getElementById(
"customerName"
).value,

phone:
document.getElementById(
"phone"
).value,

address:
document.getElementById(
"address"
).value,

city:
document.getElementById(
"city"
).value,

state:
document.getElementById(
"state"
).value,

pincode:
document.getElementById(
"pincode"
).value,

paymentMethod:
document.getElementById(
"paymentMethod"
).value

};

let url="";

if(productId){

url=
`${API_URL}/api/order/buy-now/${productId}`;

}else{

url=
`${API_URL}/api/order/place`;

}

fetch(url,{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:
"Bearer "+token

},

body:JSON.stringify(data)

})

.then(res=>{

if(!res.ok){

throw new Error(
"Order failed"
);

}

return res.json();

})

.then(()=>{

alert(
"Order placed successfully"
);

localStorage.removeItem(
"buyNowProductId"
);

window.location.href=
"orders.html";

})

.catch(err=>{

alert(err.message);

});

});