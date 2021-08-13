const getElement = (selector)=>{
    return document.querySelector(`.${selector}`);
}

let navs = getElement("nav-links")
let menuBtn = getElement("fa-bars")
menuBtn.addEventListener("click", ()=>{
    navs.classList.toggle("show")
})