var cart={}; // корзина

$.getJSON('goods.json', function (data) {
    var goods = data;
    checkCart();
    showMiniCart();
    showCart();
    showInfo();

    function showCart() {
        if ($.isEmptyObject(cart)) {
            // корзина пуста
            var out = 'Cart is empty';
            $('#my-cart').html(out);
        }
        else
        {
            var out = '';
            for (var key in cart) {
                out += '<div class="goods-in-cart">';
                out += '<button class="delete" data-art="' + key + '">&#215</button>';
                out += '<img src="' + goods[key].image + '" width="100">';
                out += '<p>'+goods[key].name+'</p>';
                out += '<button class="minus" data-art="' + key + '">&#8722</button>';
                out += '<p class="number">'+cart[key]+'</p>';
                out += '<button class="plus" data-art="' + key + '">&#43</button>';
                out += '<p>$ '+cart[key] * goods[key].cost+'</p>';
                out += '<br>';
                out += '</div>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }
    function plusGoods() {
        var articule = $(this).attr('data-art');
        cart[articule]++;
        saveCartToLS();
        showMiniCart();
        showCart();
        showInfo();
    }
    function minusGoods() {
        var articule = $(this).attr('data-art');
        if (cart[articule]>1) {
            cart[articule]--;
        }
        else {
            delete cart[articule];
        }
        saveCartToLS();
        showMiniCart();
        showCart();
        showInfo();
    }
    function deleteGoods() {
        var articule = $(this).attr('data-art');
        delete cart[articule];
        saveCartToLS();
        showMiniCart();
        showCart();
        showInfo();
    }
    function showInfo() {
        if ($.isEmptyObject(cart)) {
            var out = '';
            out += '<button class="main-button"><a href="shop-page.html">Shop now!</a></button>';
            $('#info-final').html(out);
        }
        else {
            var out = '';
            var summed = 0;
            for (var key in cart) {
                summed += cart[key] * goods[key].cost;
            }
            out += '<p>Total: '+ summed +'</p>';
            out += '<button class="main-button">Checkout</button>';
            $('#info-final').html(out);
        }
    }
});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}
function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
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
