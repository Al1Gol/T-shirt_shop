const base_url = 'https://run.mocky.io'
const get_products = '/v3/91a51943-2cd8-490f-8fa2-fa434f347cd4'

const get_json = (url) => new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    const loadHandler = () => {
        resolve(JSON.parse(xhr.response))
    }
    xhr.send();
    xhr.onload = loadHandler;
})

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

    sumarize() {
        return this.products.reduce((prev, {price}) => {
            return prev + price
        }, 0)
    }

    fetchProducts() {
        return get_json(`${base_url}${get_products}`).then((data) => {
            this.products = data;
        })
    }

    render() {
        let productsList = this.products.map(item => {
            const productItem = new ProductsItem(item);
            return productItem.render();
        });
        document.querySelector('.products-list').innerHTML = productsList.join('');
    }
}


const productsList = new ProductsList();
productsList.fetchProducts().then(() => { 
    productsList.render() 
});
console.log(productsList.sumarize())
