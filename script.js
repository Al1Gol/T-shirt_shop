const products = [
    {title: 'Тёмный рыарь', price: '1300 руб.', image: './img/batman.jpg'},
    {title: 'Футурама, Бэндер', price: '1120 руб.', image: './img/bender.jpg'},
    {title: 'Самый лучший геймер', price: '1200 руб.', image: './img/best_gamer.jpg'},
    {title: 'Death Metal', price: '1000 руб.', image: './img/death_metal.jpg'},
    {title: 'Devops', price: '980 руб.', image: './img/devops.jpg'},
    {title: 'Фибоначчи, золотое сечение', price: '1220 руб.', image: './img/fibonachi.jpg'},
    {title: 'Гуррен Лаган', price: '1250 руб.', image: './img/gurren.jpg'},
    {title: 'Hello, world!', price: '1200 руб.', image: './img/hello_world.jpg'},
    {title: 'Дзюндзи Ито', price: '1100 руб.', image: './img/ito.jpg'},
    {title: 'Linux, Star Wars', price: '1150 руб.', image: './img/linux.jpg'},
    {title: 'Луффи, One Piece', price: '1500 руб.', image: './img/luffy.jpg'},
    {title: 'Овервотч', price: '1450 руб.', image: './img/overwatch.jpg'},
    {title: 'Рик и морти', price: '1350 руб.', image: './img/rick_morty.jpg'},
    {title: 'Ryzen', price: '1250 руб.', image: './img/ryzen.jpg'},
    {title: 'Единорог', price: '1150 руб.', image: './img/unicorn.jpg'},
];

const renderProductsItem = ({title = 'Информация о товаре отсутствует', price = '-', image = './img/default.jpg'}) => {
    return `
        <div class='products-item'>
            <img class='products-image' src="${image}" alt="${title}">
            <h3 class='product-title'>${title}</h3>
            <p class='product-price'>${price}</p>
        </div>
    `;
};

const renderProductsList = (list) => {
    let productsList = list.map(item => renderProductsItem(item));
    document.querySelector('.products-list').innerHTML = productsList.join('');
}

renderProductsList(products);