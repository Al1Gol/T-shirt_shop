const app = new Vue({
    el:'#app',
    data:{
        name: 'John',
        title: 'Hello, world!',
        isAlive: false,
        config: {
            address: 'Moscow'
        },
        arr: [1, 2, 3, 4]
    },
    methods: {
        clickHandler() {
            console.log(this.name)
        },
        getTest() {
            return 'test'
        },
        handler(event) {
             this.name = event.target.value
        }
    },
    computed: {
       newName() {
            return `${this.name}!`
       }
    }, 
    beforeCreate() {
        console.log('Создается перед созданием приложения. Для подготовительных работ.')
    },
    beforeMount() {
        console.log('Создается перед монтированием приложения. Для подготовительных работ.')
    },
    beforeMount() {
        console.log('Создается перед монтированием приложения.')
    },
    mounted() {
        console.log('Создается когда приложение отрендерилось. Для обращений в бекенд.')
    },
    beforeDestroy() {
        console.log('Создается перед уничтожением приложения. Для отписок.(удаление всех setTimouts, callbacks и т.д.')
    },
    mounted: {

    }
})

setTimeout(() => {
    app.name = 'Helen'
}, 2000)