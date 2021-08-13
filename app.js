const getElement = (selector)=>{
    return document.querySelector(`.${selector}`);
}

let navs = getElement("nav-links")
let menuBtn = getElement("fa-bars")
menuBtn.addEventListener("click", ()=>{
    navs.classList.toggle("show")
})

let cartModal = getElement("cart")
let cartBtn = getElement("btn-cart")
let cartExit = getElement("btn-cart-exit")
cartBtn.addEventListener("click", ()=>{
    cartModal.classList.toggle("show")
})
cartExit.addEventListener("click", ()=>{
    cartModal.classList.remove("show")
})