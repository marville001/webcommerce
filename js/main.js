const getElement = selector=>{
    return document.querySelector(selector);
}

const menuBtn = getElement(".fa-bars")
const navs = getElement(".nav-links")
const cart = getElement(".cart")
const cartBtn = getElement(".btn-cart")
const cartExit = getElement(".btn-cart-exit")
const btnContinue = getElement(".btn-continue")
const btnCheckout = getElement(".btn-checkout")


menuBtn.addEventListener('click', ()=>{
    navs.classList.toggle("show")
})

cartBtn.addEventListener('click', ()=>{
    cart.classList.toggle("show")
})

cartExit.addEventListener('click', ()=>{
    cart.classList.remove("show")
})

btnContinue.addEventListener('click', ()=>{
    cart.classList.remove("show")
})

btnCheckout.addEventListener('click', ()=>{
    cart.classList.remove("show")
})
