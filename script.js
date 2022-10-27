const base_url = 'https://run.mocky.io'
const get_products = '/v3/91a51943-2cd8-490f-8fa2-fa434f347cd4'

function init() {
    //Логотип
    Vue.component ('logo', {
        template: `
            <a href="index.html">
                <img class='logo' src="./img/logo.png" alt="T-Shop">
            </a>
        `
    })

    //Строка поиска
    Vue.component ('search-form', {
        props: [
            'value'
        ],
        template: `
            <form>
                <input 
                    v-bind:value="value" 
                    v-on:input="$emit('input', $event.target.value)"
                    class="search-input" 
                    type="search"  
                    name="search" 
                    placeholder="Поиск товаров"
                >
                <button class="btn" type="submit" value="Найти">
                    Найти
                </button>
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
        template: `
            <div class="basket">
                <input type="image" src="./img/close.png"  class="close" @click="$emit('click_close')">
            </div>
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
                <p class="product-price">{{ product.price }} руб.</p>
            </div>
        `
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
            searchLine: '',
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
            },
            filteredProducts(){
                return this.products.filter(({ title }) => {
                    const regExp = new RegExp(this.searchLine, 'i')
                    return regExp.test(title)
                })
            }
            
        },
        mounted() {
            fetch(`${base_url}${get_products}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.products = data;
            })
        }
    })
}

window.onload = init