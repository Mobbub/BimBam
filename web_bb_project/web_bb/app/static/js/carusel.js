let right_button = document.querySelector(".button-right")
let left_button = document.querySelector(".button-left")
let cards = document.querySelectorAll(".card-developer__item")
let dots = document.querySelectorAll(".dot-position_item")

let position = 1
let card_lenth = (cards.length - 1)


right_button.addEventListener("click", function(){
    if (position !== card_lenth){
        position += 1;
        style_cards(position)
        dot_position(position)
    }
})

left_button.addEventListener("click", function(){
    if (position !== 0){
        position -= 1;        
        style_cards(position)
        dot_position(position)
    }
})

function dot_position(position){
    for (i = 0; i < (card_lenth + 1); i++){
        if (dots[i].classList.contains('active')){
            dots[i].classList.remove('active')
        }
    }
    dots[position].classList.add('active')
}

function style_cards(position){
    remove_style(position)
    left_button.style.opacity = '1'
    right_button.style.opacity = '1'
    left_button.style.cursor = 'pointer'
    right_button.style.cursor = 'pointer'
    if (position > 0 && position < (card_lenth)){
        cards[position - 1].classList.add('left')
        cards[position + 1].classList.add('right')
    }
    else {
        if (position === card_lenth){
            cards[position - 1].classList.add('left')
            right_button.style.opacity = '0'
            right_button.style.cursor = 'auto'
        }
        else {
            if (position === 0){
                cards[position + 1].classList.add('right')
                left_button.style.opacity = '0'
                left_button.style.cursor = 'auto'
            }
        }
    }
    add_none(position)
}

function remove_style(position){
    for (i = 0; i < (card_lenth + 1); i++){
        if (cards[i].classList.contains('right')){
            cards[i].classList.remove('right')
        }
        if (cards[i].classList.contains('left')){
            cards[i].classList.remove('left')
        }
        if (cards[i].classList.contains('none')){
            cards[i].classList.remove('none')
        }
    }
}

function add_none(position){
    for (i = 0; i < (card_lenth + 1); i++){
        if (i !== position && i !== (position - 1) && i !== (position + 1)){
            cards[i].classList.add('none')
            if (i < position){
                cards[i].style.transform = 'scale(0.8) translate(-150%, 0%);'
            }
            else{
                cards[i].style.transform = 'scale(0.8) translate(150%, 0%);'
            }
        }
    }
}