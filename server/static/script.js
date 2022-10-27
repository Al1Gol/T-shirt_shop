//const base_url = 'https://run.mocky.io'
const base_url = 'http://localhost:8000'
//const get_products = '/v3/91a51943-2cd8-490f-8fa2-fa434f347cd4'
const get_products = `${base_url}/products.json`
const get_basket = `${base_url}/basket-products`


function service(url, method='GET', body){
    return fetch(url, {
        headers: Object.assign({}, body ? {
            'Content-Type': 'application/json; charset=utf-8'
          } : {}),
        method,
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
}

function init() {
    //Логотип
    Vue.component ('logo', {
        template: `
            <a href="index.html">
                <img class='logo' src="./img/icons/logo.png" alt="T-Shop">
            </a>
        `
    })

    Vue.component ('base-btn', {
        template: `
            <button class="btn">
                <slot></slot>
            </button>
        `
    })

    //Строка поиска
    Vue.component ('search-form', {
        props: [
            'search'
        ],
        template: `
            <form>
                <input 
                    class="search-input" 
                    type="search"  
                    name="search" 
                    placeholder="Поиск товаров"
                    :value="search"
                >
                <base-btn type="submit" value="Найти">
                    Найти
                </base-btn>
            </form>
        `
    })

    //Кнопка козины
    Vue.component ('basket-btn', {
        template: `
            <button class="basket-btn btn" type="button"  @click="$emit('click_close')">Корзина</button>
        `
    })

    //Форма корзины
    Vue.component ('basket-card', {
        data() {
            return {
                basketProductItems: []
            }
        },
        template: `
            <div class="basket">
                <div class=header-basket>
                    <h2>Корзина</h2>
                    <input type="image" src="./img/icons/close.png"  class="close" @click="$emit('click_close')">
                </div>
                <div class="basket-content">
                    <table>
                        <tbody>
                            <basket-item class="basket-item" v-for="item in basketProductItems" :item="item" @add="addProduct" @del="delProduct" :basketProductItems="basketProductItems">             
                            </basket-item>
                        </tbody>
                    </table>
                </div>
                <div>
                <div class="basket-footer">
                    <b>Всего: руб.</b>
                </div>
            </div>
        `,
        mounted() {
            service(get_basket)
            .then((data) => {
                this.basketProductItems = data
            })
        },
        methods:{
            addProduct(id) {
                service(get_basket, 'PUT', {
                    id
                }).then((data) => {
                    this.basketProductItems = data
                })
            },
            delProduct(id) {
                service(get_basket, 'DELETE', {
                    id
                }).then((data) => {
                    this.basketProductItems = data
                })
            }
        }
    })

    Vue.component ('basket-item', {
        props: [
            'item'
          ],
        template: `
            <tr>
                <td class="image-row"><img class="basket-img" :src="item.data.image" :alt="item.data.title"></td>
                <td class="title-row">{{item.data.title}}</td>
                <td class="indent-row"><b>{{item.data.price}}</b></td>
                <td class="indent-row"><b>X</b></td>
                <td><input class = "value" type="image" src="./img/icons/minus.png"  class="count" @click="$emit('del', item.data.id)"></td>
                <td class="count-row"><b><input class="count-value" type="text" :value='item.count'></b></td>
                <td class="indent-row"><input type="image" src="./img/icons/plus.png"  class="count"  @click="$emit('add', item.data.id)"></td>
                <td class="indent-row"><b>=</b></td>
                <td class="sum"><b>{{item.total}}</b></td>
            </tr>
        `
    })

    //Карточка товара
    Vue.component ('products-item', {
        props: [
            'product'
        ],
        template: `
            <div class="products-item">
                <img class="products-image" :src="product.image" :alt="product.title">
                <h3 class="product-title" :title="product.title">{{ product.title }}</h3>
                <p class="product-price">{{ product.price }} руб.
                <button @click="addProduct" class="btn add_to_basket">
                <img class='basket_icon' src="./img/icons/basket_icons.png" alt="Добавить в корзину">
            </button></p>

            </div>
        `,
        mounted() {
            service(get_basket)
            .then((data) => {
                this.basketProductItems = data
            })
        },
        methods: {
            addProduct() {
                service(get_basket, 'PUT', {
                    id: this.product.id
                })
            }
        }
    })

    //Заглушка отсутствия товаров
    Vue.component ('products-empty', {
        template: `
            <div class="products-list">
                <h1>Товар отсутствует</h1>
            </div>
        `
    })


    //Главное приложение
    const app = new Vue({
        el: '#app',
        data: {
            products: [],
            filteredProducts: [],
            filtered: '',
            search: '',
            isVisibleCard: false
        },  
        methods: {
            sumarize() {
                return this.products.reduce((prev, {price}) => {
                    return prev + price
                }, 0)
            },
            showBasketCard() {
                this.isVisibleCard =  !this.isVisibleCard
            }
        },
        computed: {
            avail: function () {
                  return this.filteredProducts.length;
            }          
        },
        mounted() {
            service(get_products)
            .then((data) => {
                this.products = data

                const urlParams = new URLSearchParams(window.location.search);
                this.search = urlParams.get('search');

                if (this.search) {
                    this.filteredProducts = this.products.filter(({ title }) => {
                        const regExp = new RegExp(this.search, 'i')
                        return regExp.test(title)
                    })
                }
                else {
                    this.filteredProducts = data;
                }
            })
        }
    })
}

window.onload = init