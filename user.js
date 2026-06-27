const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {
    window.location.href = "login.html";
}

if (role === "ADMIN") {
    window.location.href = "index.html";
}
const GET_API =
`${API_URL}/api/products`;

let allProducts = [];

function loadProducts() {

    fetch(GET_API, {
        headers: {
            "Authorization":
                "Bearer " + token
        }
    })
    .then(res => {

        if (res.status === 401 ||
            res.status === 403) {

            localStorage.clear();

            window.location.href =
                "login.html";
        }

        return res.json();
    })
    .then(data => {

        allProducts = data;

        displayProducts(data);
    })
    .catch(err => {

        console.log(err);

        alert(
            "Products Not Loading"
        );
    });
}


function displayProducts(products) {

    const container =
        document.getElementById(
            "products"
        );

    container.innerHTML = "";

    products.forEach(p => {

        const card =
            document.createElement(
                "div"
            );

      card.className = "card";

card.onclick = () => showDetails(p);
        card.innerHTML = `

        <img src="${
            p.imageUrl
            ?
        `${API_URL}/uploads/${p.imageUrl}`
            :
            'https://via.placeholder.com/300'
        }">

        <h3>${p.name}</h3>

        <p>${p.brand}</p>

        <p>${p.description}</p>

        <p>₹ ${p.price}</p>

        <p>Qty: ${p.quantity}</p>

        <p>
        ${
            p.available
            ?
            "In Stock"
            :
            "Out of Stock"
        }
        </p>
<div class="card-buttons">

<button

class="cart-btn"

onclick="event.stopPropagation();
addToCart(${p.id})">

🛒 Add To Cart

</button>

<button

class="buy-btn"

onclick="event.stopPropagation();
buyNow(${p.id})">

⚡ Buy Now

</button>

</div>

        `;
        container.appendChild(card);
    });
}

document
.getElementById("searchInput")
.addEventListener(
    "input",
    function () {

        const key =
            this.value.toLowerCase();

        const filtered =
            allProducts.filter(
                p =>
                p.name
                .toLowerCase()
                .includes(key)
            );

        displayProducts(filtered);
    }
);
///ADD TO CART FUNCTION 
async function addToCart(productId){

const response = await fetch(
`${API_URL}/api/cart/add/${productId}`,

{

method:"POST",

headers:{

"Authorization":"Bearer "+token

}

}

);

if(response.ok){

alert("Added to cart");

}else{

alert("Error");

}

}
function logout() {

    localStorage.removeItem(
        "token" );

    localStorage.removeItem(
        "role"
    );

    window.location.href =
        "login.html";
}

//BUY NOW FUNCTION CALLED API OF BACKEND
async function buyNow(productId){

localStorage.setItem(
"buyNowProductId",
productId
);

window.location.href=
"checkout.html";
}

async function loadTotal(){

const response=await fetch(

`${API_URL}/api/cart/total`,

{

headers:{

Authorization:

"Bearer "+token

}

}

);

const total=

await response.json();

document.getElementById(

"totalPrice"

).innerText=

"Total : ₹"+total;

}
function showDetails(product){

document.getElementById("detailImage").src =
product.imageUrl
? `${API_URL}/uploads/${product.imageUrl}`

: "https://via.placeholder.com/300";

    document.getElementById("detailName").innerText =
        product.name;

    document.getElementById("detailBrand").innerText =
        "Brand : " + product.brand;

    document.getElementById("detailDescription").innerText =
        product.description;

    document.getElementById("detailPrice").innerText =
        "Price : ₹" + product.price;

    document.getElementById("detailQuantity").innerText =
        "Available Quantity : " + product.quantity;

    document.getElementById("detailAvailability").innerText =
        product.available
            ? "In Stock"
            : "Out Of Stock";

    document.getElementById("detailsModal")
        .style.display = "flex";
}

function closeDetails(){

    document.getElementById("detailsModal")
        .style.display = "none";
}
loadProducts();