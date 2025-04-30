let bur_button = document.querySelector(".burger-button")
let bur_nav = document.querySelector(".nav")
let burger_slash = document.querySelectorAll(".burger-slash")

bur_button.addEventListener("click", function (e){
    bur_nav.classList.toggle("active")
    bur_button.classList.toggle("active")
    if (bur_nav.classList.contains("active")){
        burger_slash[0].style.transform = 'rotate(45deg)'
        burger_slash[1].style.opacity = '0'
        burger_slash[2].style.transform = 'rotate(-45deg)'
        burger_slash[0].style.margin = '0px'
        burger_slash[2].style.margin = '0px'
    }
    else{
        burger_slash[0].style.transform = 'rotate(0)'
        burger_slash[1].style.opacity = '1'
        burger_slash[2].style.transform = 'rotate(0)'
        burger_slash[0].style.margin = '-20px 0px 0px 0px'
        burger_slash[2].style.margin = '0px 0px -20px 0px'
    }
})