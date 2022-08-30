const base_url = 'https://run.mocky.io'
const get_products = '/v3/91a51943-2cd8-490f-8fa2-fa434f347cd4'

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
              return this.products.length;
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