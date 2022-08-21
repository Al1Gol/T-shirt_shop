//ToDo - вам необходимо скопировать данный скрипт в свой проект, и сдавать ДЗ в рамках собственного репозитория


// 1) Какие виды областей видимости вы знаете? Написать ответ ниже
// Локальная, глобальная, блочная, кэтч


// 2) Исправьте код так чтобы в консоль выводились числа от 0 до 10
for (var i = 0; i <= 10; i++) {
    (function(i) {
         setTimeout(() => {
            console.log(i);
         }, 0);
    })(i);   
}

 
 // 3) Исправьте код так чтобы в консоль выводилось "John"
 var firstName = "Elena"
 const obj = {
    firstName: 'John',
    sayFirstName: function() {
       console.log(this.firstName)
    }
 }
 const first_name = obj;
first_name.sayFirstName();
 
 
 // 4) Исправьте код так чтобы в консоль не выводилась ошибка (нельзя исправлять тело функции getArrowFunction)
  const user = {
    age: 20
 }
 function getArrowFunction() {
    "use strict"
    return () => {
       console.log(this.age)
    }
 }
 
 const arrowFunction = getArrowFunction.call(user);
 arrowFunction();