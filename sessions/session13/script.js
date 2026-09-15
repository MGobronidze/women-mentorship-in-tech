// const greet = function(name="user") {
//   return `გამარჯობა, ${name}!`;
// };

// function square(num=1) {
//   return num * num;
// }

// function perimeter(length=1, width=1) {
//   let result = 2 * (length + width);
//   return result;
// }


// console.log(greet("ანა"));
// console.log(greet("ლალი"));
// console.log(greet("გიორგი"));
// console.log(greet("ნინო"));
// console.log(square(5));
// console.log(perimeter(10, 5));
// console.log(perimeter());
// console.log(square());
// console.log(perimeter(4));
// console.log(greet());



// console.log(greet("მარი"));
// console.log(greet());

// function greet(name ="user") {
//   return `გამარჯობა, ${name}!`;
// }

// const greet = (name, lname) => {
//   return `გამარჯობა, ${name} ${lname}!`;
// };

// // მოკლე ფორმა — ერთი გამოსახულება, ავტომატური return
// const greetShort = (name, lname) => `გამარჯობა, ${name} ${lname}!`;

// const square = num => num * num;

// // პარამეტრის გარეშე / რამდენიმე პარამეტრით
// const sayHi = () => console.log("გამარჯობა!");
// const add = (a, b) => a + b;
 
// const card = {
//   title: "ჩემი ბარათი",

//   // ჩვეულებრივი ფუნქცია — this ეხება იმას, ვინც ფუნქციას "იძახებს" (card ობიექტს)
//   showRegular: function() {
//     console.log(this.title); // "ჩემი ბარათი" — this === card
//   },

//   // Arrow function — this "სესხულობს" გარე (გლობალურ) scope-ს, არა card-ს!
//   showArrow: () => {
//     console.log(this.title); // undefined — this აქ არ არის card
//   },
// };

// card.showRegular(); // "ჩემი ბარათი"
// card.showArrow();    // undefined

// function outer() {
//   const outerVar = "გარეთ";

//   function inner() {
//     const innerVar = "შიგნით";
//     console.log(outerVar); 
//     console.log(innerVar); 
//   }

//   inner();
//   console.log(innerVar); 
// }

// outer();

function memoize(fn) {
  const cache = {}; // closure-ით "დაცული" cache — გარედან პირდაპირი წვდომა არ არსებობს

  return function(n) {
    if (n in cache) {
      console.log(`(cache-იდან: ${n})`);
      return cache[n];
    }
    console.log(`(გამოითვლება: ${n})`);
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

function slowSquare(n) {
  for (let i = 0; i < 5000000000; i++) {
    // 
  } // განზრახ "ნელი" გამოთვლა
  return n * n;
}

const fastSquare = memoize(slowSquare);
fastSquare(5); // "(გამოითვლება: 5)" — ნელი, პირველად
fastSquare(5); // "(cache-იდან: 5)" — მყისიერი, მეხსიერებიდან