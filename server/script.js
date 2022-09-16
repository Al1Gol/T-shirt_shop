const express = require('express');
const cors = require('cors');
const { writeFile, readFile } = require('fs/promises'); 
 
const basket_products = "./static/basket-products.json"
const products = "./static/products.json"


function getRawBasketProducts() {
    return readFile(basket_products, 'utf-8').then((text) => {
        return JSON.parse(text);
    });
}

function getProducts() {
    return readFile(products, 'utf-8').then((text) => {
        return JSON.parse(text);
    });
}

function getBasketProducts() {
    return Promise.all([
        getRawBasketProducts(),
        getProducts()
    ]).then(([rawBasketProducts, products]) => {
        return rawBasketProducts.map((rawBasketProduct) => {
            const {product_id, count} = rawBasketProduct;
            const product = products.find(({ id }) => {
                return id === product_id
            });
            return {
                ...rawBasketProduct,
                data: product,
                total: count * product.price
            }
        })
    })
}

function addBasketProduct(_id) {
    return getRawBasketProducts().then((basketProducts) => {
        if (basketProducts.find(({ product_id }) => product_id === _id)) {
            const result = basketProducts.map((basketProduct) => {
                if (basketProduct.product_id === _id) {
                    return {
                        ...basketProduct,
                        count: basketProduct.count + 1
                    }
                } else {
                    return basketProduct
                }
            });
            return result
        } else {
            return [
                ...basketProducts,
                {
                    product_id: _id,
                    count: 1
                }
            ];
        }
    })
    .then((result) => {
        return writeFile(basket_products, JSON.stringify(result)).then(() => {
            return result;
        })
    })
}

function delBasketProduct(_id) {
    return getRawBasketProducts().then((basketProducts) => {
        return basketProducts.map((basketProduct) => {
            if (basketProduct.product_id === _id){
                return {
                    ...basketProduct,
                    count: basketProduct.count - 1
                }
            } else {
                return basketProduct;
            }
        }).filter(({count}) => count > 0);
    }).then((result) => {
        return writeFile(basket_products, JSON.stringify(result)).then(() => {
            return result;
        })
    })
}

const app = express();
app.use(cors()); //Пустой корс разрешает любому домену обращаться без ошибки
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get('/basket-products', (req, res) => {
    getBasketProducts().then((data) => {
        res.send(data);
    });
});

app.put('/basket-products', (req, res) => {
    addBasketProduct(req.body.id).then(() => {
        getBasketProducts().then((data) => {
            res.send(data)
        });

    })
});

app.delete('/basket-products', (req, res) => {
    delBasketProduct(req.body.id).then(() => {
        getBasketProducts().then((data) => {
            res.send(data)
        });
    })
});

app.listen('8000', () => {
    console.log('server is starting')
});