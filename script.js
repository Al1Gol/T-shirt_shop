const products = [
    {title: 'Тёмный рыарь', price: 1300, image: './img/batman.jpg'},
    {title: 'Футурама, Бэндер', price: 1120, image: './img/bender.jpg'},
    {title: 'Самый лучший геймер', price: 1200, image: './img/best_gamer.jpg'},
    {title: 'Death Metal', price: 1000, image: './img/death_metal.jpg'},
    {title: 'Devops', price: 980, image: './img/devops.jpg'},
    {title: 'Фибоначчи, золотое сечение', price: 1220, image: './img/fibonachi.jpg'},
    {title: 'Гуррен Лаган', price: 1250, image: './img/gurren.jpg'},
    {title: 'Hello, world!', price: 1200, image: './img/hello_world.jpg'},
    {title: 'Дзюндзи Ито', price: 1100, image: './img/ito.jpg'},
    {title: 'Linux, Star Wars', price: 1150, image: './img/linux.jpg'},
    {title: 'Луффи, One Piece', price: 1500, image: './img/luffy.jpg'},
    {title: 'Овервотч', price: 1450, image: './img/overwatch.jpg'},
    {title: 'Рик и морти', price: 1350, image: './img/rick_morty.jpg'},
    {title: 'Ryzen', price: 1250, image: './img/ryzen.jpg'},
    {title: 'Единорог', price: 1150, image: './img/unicorn.jpg'},
];

class ProductsItem {
    constructor({title = 'Информация о товаре отсутствует', price = '-', image = './img/default.jpg'}) {
        this.title = title;
        this.price = price;
        this.image = image;
    }
    render(){
        return `
        <div class='products-item'>
            <img class='products-image' src="${this.image}" alt="${this.title}">
            <h3 class='product-title'>${this.title}</h3>
            <p class='product-price'>${this.price} руб.</p>
        </div>
    `;
    }
}

class ProductsList {
    products = [];
    fetchProducts() {
       this.products = products;
    }
    render() {
        let productsList = this.products.map(item => {
            const productItem = new ProductsItem(item);
            return productItem.render();
        });
        document.querySelector('.products-list').innerHTML = productsList.join('');
    }
}

class TotalCost{
    sum = 0;
    products = [];
    sumarize(productsList) {
            this.products = productsList
            products.map(item => this.sum = this.sum + item.price)
            return this.sum
        }
}

const productsList = new ProductsList();
productsList.fetchProducts();
productsList.render();
const productsCost = new TotalCost();
console.log(productsCost.sumarize(products))