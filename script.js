const products = [
    {id: 1,name:"speaker",Image:"https://m.media-amazon.com/images/I/41ckxEdD0aL._SY300_SX300_.jpg",price:1000},
    {id: 2,name:"watch",Image:"https://m.media-amazon.com/images/I/61ei8r7kJEL._AC_UY218_.jpg",price:499},
    {id: 3,name:" Anarkali Gown",Image:"https://m.media-amazon.com/images/I/61worG8u3VL._AC_UL320_.jpg",price:5000},
    {id: 4,name:"Hero PLEASURE+ ",Image:"https://m.media-amazon.com/images/I/51UBi84+afL._AC_UL320_.jpg",price:100000},
    {id: 5,name:"Samsung Galaxy S25 Ultra 5G",Image:"https://m.media-amazon.com/images/I/61sU8OqBs4L._AC_UY218_.jpg",price:141999},

    {id: 6,name:"Adaptor",Image:"https://m.media-amazon.com/images/I/51ml3GPJhGL._AC_UL320_.jpg",price:200},

    {id: 7,name:"Banarasee",Image:"https://m.media-amazon.com/images/I/51uiUQSHzAL._AC_UL320_.jpg",price:3000},
    {id: 8,name:"Hopscotch Girls",Image:"https://m.media-amazon.com/images/I/517l+XiMbSL._AC_UL320_.jpg",price:599},
    {id: 9,name:"Shoe with Laces",Image:"https://m.media-amazon.com/images/I/41Qzypcq7ZL.AC_SX250.jpg",price:1599},
    {id: 10,name:"laggage bag",Image:"https://m.media-amazon.com/images/I/61TLGY9BGWL._AC_UL320_.jpg",price:1000},
    {id: 11,name:"RUDRAPRAYAG anarkali",Image:"https://images-eu.ssl-images-amazon.com/images/I/71AryVXM5LL._AC_UL165_SR165,165_.jpg",price:2000},
   {id: 13,name:"Sandals",Image:"https://m.media-amazon.com/images/I/519t0YrAlXL._AC._SR360,460.jpg",price:399},
    {id:14,name:"sofa",Image:"https://m.media-amazon.com/images/I/81EMLTFSPaL._AC_UL320_.jpg",price:20000},
    {id:15,name:"Coffee Mug ",Image:"https://m.media-amazon.com/images/I/61hIVSUUhcL._AC._SR360,460.jpg",price:500},
    {id:16,name:" Solimo Round Pots",Image:"https://m.media-amazon.com/images/I/51X4DUoWpeL.AC_SX250.jpg",price:1099},
    {id:17,name:"Classic Wall Light (",Image:"https://m.media-amazon.com/images/I/61Xs2Vy5DgL._AC_UL320_.jpg",price:599},
    {id:18,name:"STRIFF ",Image:"https://m.media-amazon.com/images/I/51cIKDs4bML._AC_UL320_.jpg",price:499},
    {id:19,name:"Genie Lush",Image:"https://m.media-amazon.com/images/I/71eVT1izeBS._AC_UL320_.jpg",price:999},
    {id:20,name:"Silver Czar Ring",Image:"https://m.media-amazon.com/images/I/51wVwlKfs4L._AC._SR360,460.jpg",price:1599},
    {id:21,name:"water bottle",Image:"https://m.media-amazon.com/images/I/51NKPZx0a6L._AC_UL320_.jpg",price:300},
    {id:22,name:"vase",Image:"https://m.media-amazon.com/images/I/51CJHjEdZhL.AC_SX250.jpg",price:1400},


]


// Render products
function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src="${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);
    })
}


// Search functionality
function searchProducts(query){
    const filterProducts = products.filter(product => 
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())

    )
    renderProducts(filterProducts,"productList");
}
// Add EventListener to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})
// sorting
function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b)=> a.price-b.price);
    }
    return products;
}
// Adding Event Listeners
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})



//Add to cart
function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name}is added to cart`)
    renderCart();
}
//Render items in cart\
function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your cart is empty</h1>"
    }
    cart.forEach(item =>{
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })

   renderSubtotal(cart);
}
// remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("product is removed successfully");
    renderCart();
}
// calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `subtotal : Rs. ${subtotal}`
        
    } else{
        subtotalContainer.innerHTML = `no items in the cart`
    }
}
if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();

