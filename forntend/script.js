const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const GET_API = "http://localhost:8080/api/products";
const BASE_API = "http://localhost:8080/api/product";

let allProducts = [];

// LOAD PRODUCTS
function loadProducts() {

  fetch(GET_API, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => {

      if (res.status === 403 || res.status === 401) {
        alert("Please Login First");
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }

      return res.json();
    })

    .then(data => {
      allProducts = data;
      displayProducts(data);
    })
     .catch(err => {

    console.log(err);

    alert("Products Not Loading");

  });
}

// DISPLAY PRODUCTS
function displayProducts(products) {

  const container = document.getElementById("products");

  container.innerHTML = "";

  products.forEach(p => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
    
      <img src="${p.imageUrl ? 'http://localhost:8080/uploads/' + p.imageUrl : 'https://via.placeholder.com/300'}">

      <h3>${p.name}</h3>

      <p>${p.brand}</p>

      <p>${p.description}</p>

      <p>₹ ${p.price}</p>

      <p>Qty: ${p.quantity}</p>

      <p>${p.available ? "In Stock" : "Out of Stock"}</p>

      <div class="btn-group">

        <button onclick="editProduct(${p.id})">Edit</button>

        <button onclick="deleteProduct(${p.id})">Delete</button>

      </div>
    `;

    container.appendChild(card);
  });
}

// SEARCH
document.getElementById("searchInput")
  .addEventListener("input", function () {

    const key = this.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(key)
    );

    displayProducts(filtered);
  });

// OPEN MODAL
function openModal() {

  document.getElementById("modalTitle").innerText = "Add Product";

  document.getElementById("productId").value = "";

  document.querySelectorAll(".modal-content input")
    .forEach(i => {

      if (i.type === "checkbox") {
        i.checked = false;
      } else {
        i.value = "";
      }

    });

  document.getElementById("productModal").style.display = "flex";
}

// CLOSE MODAL
function closeModal() {

  document.getElementById("productModal").style.display = "none";
}

// EDIT PRODUCT
function editProduct(id) {

  const p = allProducts.find(x => x.id === id);

  document.getElementById("modalTitle").innerText = "Update Product";

  document.getElementById("productId").value = p.id;

  document.getElementById("name").value = p.name;

  document.getElementById("description").value = p.description;

  document.getElementById("brand").value = p.brand;

  document.getElementById("price").value = p.price;

  document.getElementById("category").value = p.category;

  document.getElementById("quantity").value = p.quantity;

  document.getElementById("available").checked = p.available;

  document.getElementById("productModal").style.display = "flex";
}

// SAVE PRODUCT
function saveProduct() {

  const id = document.getElementById("productId").value;

  const file = document.getElementById("imageFile").files[0];

  // IF IMAGE EXISTS
  if (file) {

    const formData = new FormData();

    formData.append("file", file);

    fetch("http://localhost:8080/api/product/upload", {

      method: "POST",

      headers: {
        "Authorization": "Bearer " + token
      },

      body: formData

    })

      .then(res => res.text())

      .then(fileName => {

        sendProductData(fileName.trim());

      });

  }

  // WITHOUT IMAGE
  else {

    sendProductData(null);

  }
}

// SEND PRODUCT DATA
function sendProductData(imageName) {

  const id = document.getElementById("productId").value;

  const product = {

    name: document.getElementById("name").value,

    description: document.getElementById("description").value,

    brand: document.getElementById("brand").value,

    price: parseInt(document.getElementById("price").value),

    category: document.getElementById("category").value,

    quantity: parseInt(document.getElementById("quantity").value),

    available: document.getElementById("available").checked,

    imageUrl: imageName

  };

  let url = BASE_API;

  let method = "POST";

  // UPDATE
  if (id) {

    url = `${BASE_API}/${id}`;

    method = "PUT";

    product.id = id;
  }

  fetch(url, {

    method: method,

    headers: {

      "Content-Type": "application/json",

      "Authorization": "Bearer " + token

    },

    body: JSON.stringify(product)

  })

    .then(() => {

      closeModal();

      loadProducts();

    });
}

// DELETE PRODUCT
function deleteProduct(id) {

  fetch(`${BASE_API}/${id}`, {

    method: "DELETE",

    headers: {
      "Authorization": "Bearer " + token
    }

  })

    .then(() => loadProducts());
}

// LOGOUT
function logout() {

  localStorage.removeItem("token");

  window.location.href = "login.html";
}

// INIT
loadProducts();