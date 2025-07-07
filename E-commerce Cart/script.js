document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "product 1", price: 49.99 },
        { id: 2, name: "product 2", price: 59.99 },
        { id: 3, name: "product 3", price: 69.99 }
    ];

    let cart = [];

    const productList = document.getElementById("product-list")
    const cartItem = document.getElementById("cart-i")
    const emptyCart = document.getElementById("hidden")
    const Total = document.getElementById("total")
    const checkOut = document.getElementById("checkout")

    products.forEach((product) => {
        const productDiv = document.createElement("div")
        productDiv.classList.add("product")
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv)
        renderCart()
    })

    productList.addEventListener("click", (e) => {
        if (e.target.tagName = 'BUTTON') {
            const productId = parseInt(e.target.getAttribute("data-id"))
            const product = products.find(product => product.id === productId)
            addCart(product)
        }
    })

    function addCart(product) {
        cart.push(product)
        renderCart()
    }

    function renderCart() {
        let totalprice = 0;
        cartItem.innerHTML = "";

        if (cart.length > 0) {
            emptyCart.classList.add("hidden")

            cart.forEach((item, index) => {
                totalprice += item.price
                const cartDiv = document.createElement("div")
                cartDiv.classList.add("cart-item")
                cartDiv.innerHTML = `
                    <span>${item.name} - $${item.price}</span>
                    <button class="remove-btn" data-id="${item.price}" style="background-color: red;">Remove</button>
                `
                cartDiv.style.display = "flex"
                cartItem.appendChild(cartDiv)
                Total.textContent = `Total: $${totalprice.toFixed(2)}`

                cartDiv.querySelector(".remove-btn").addEventListener("click", (e) => {
                    const cutPrice = e.target.getAttribute("data-id")

                    console.log(cutPrice);
                    if (totalprice > 0) {
                        cartDiv.remove()
                        totalprice -= cutPrice
                    } 
                    
                    if(totalprice === 0){
                        emptyCart.classList.remove("hidden")
                        totalprice == 0
                    }
                    Total.textContent = `Total: $${totalprice.toFixed(2)}`
                })
            })

        } else {
            emptyCart.classList.remove("hidden")
        }
    }

    checkOut.addEventListener("click", () => {
        if (totalprice === 0) {
            alert("add product to proceed")
        } else {
            alert("click to checkout")
        }
    })
})

