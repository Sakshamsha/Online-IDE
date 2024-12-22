export const toggleClass = (element,classname) =>{
    let ele = document.querySelector(element);
    ele.classList.toggle(classname);
}