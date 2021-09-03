var cart = {}; //моя корзина

$("document").ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    // загружаю товары на страницу
    $.getJSON('goods.json', function(data) {
        var out = '';
        for (var key in data) {
            out+='<div class="single-goods" data-art="'+key+'">';
            out+='<img src="'+data[key].image+'">';
            out+='<p>'+data[key]['name']+'</p>';
            out+='<p>$ '+data[key]['cost']+'</p>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('.single-goods').on('click', PopUpShow);
    });
}

function PopUpShow(){
    var articul = $(this).attr('data-art');
    $("#popup1").show();
    $('.overlay_popup').show();
    $.getJSON('goods.json', function(data) {
        var goods = data;
        var out = '';
        if (goods[articul]!==undefined) {
            out += '<div class="info-goods">';
            out += '<img src="' +goods[articul]['full']+ '" width="100">';
            out += '<p style="font-size: 18px">' + goods[articul]['name'] + '</p>';
            out += '<p style="font-size: 18px">$ ' + goods[articul]['cost'] + '</p>';
            out += '<p>'+'Info:'+'</p>';
            out += '<p>' + goods[articul]['description'] + '</p>';
            out += '<br>';
            out += '<p>'+'Limited edition'+'</p>';
            out += '<p>'+'We deliver worldwide'+'</p>';
            out += '<button class="main-button" data-art="' + articul + '">Add to cart</button>';
            out += '</div>';
        }
        $('#goodsinfo').html(out);
        $('button.main-button').on('click', addToCart);
    });
}

$('.overlay_popup').click(function() { // Обрабатываем клик по заднему фону
    $('.overlay_popup, #popup1').hide(); // Скрываем затемнённый задний фон и основное всплывающее окно
})

function addToCart() {
    // Добавляем товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!==undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showMiniCart();

}

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    // показываю содержимое корзины
    var out = '';
    out+='<a href="cart-page.html">Cart </a>';
    var summed = 0;
    for (var key in cart) {
        summed += cart[key];
    }
    out+= '('+summed+')';
    $('#mini-cart').html(out);
}