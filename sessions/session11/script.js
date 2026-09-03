// let number = 565;

// if (number%4 === 0) {
//    console.log("The number is divisible by 4.");
// }else if (number%4 === 1) {
//     console.log("The number is not divisible by 4. the remainder is  1.");
// }else if (number%4 === 2) {
//     console.log("The number is not divisible by 4. the remainder is  2.");
// }else {
//     console.log("The number is not divisible by 4. the remainder is  3  .");
// }

// console.log("This line will always execute.");


// let day = 1;
// let result = "";

// switch (day) {
//   case "0":
//   case "6":
//     result ="weekend";
//     break;
//   case "1":
//   case "2":
//   case "3":
//   case "4":
//   case "5":
//     result ="weekday";
//     break;
//   default:
//     result ="invalid day";
//     break;
// }

// if (result === "weekend") {
//     console.log("It's the weekend!");
// } else if (result === "weekday") {
//     console.log("It's a weekday.");
// } else {
//     console.log("Invalid day.");
// }

// let age = 18;
// if (age > 18) {
//     console.log("You are an adult.");
// } else if (age === 18) {
//     console.log("You are 18.");
// }else{
//     console.log("You are not an adult.");
// }

// age > 18 ? console.log("You are an adult.") : console.log("You are not an adult.");


// for (let i = 0; i < 50; i+=10) {
//   console.log(i); 
// }
// console.log("Loop finished.");

// let i = 0;
// while (i < 50) {
//   console.log(i);
//   i += 10;
// }
// console.log("Loop finished.");

// for (let iteration = 500; iteration > 0; iteration-=100) {
//   console.log(iteration); 
// }
// console.log("Loop finished.");
// let iteration = 500;
// while (iteration > 0) {
//   console.log(iteration);
//   iteration -= 100;
// }
// console.log("Loop finished.");

// 1-50 რიცხვთა ჯამი

// let sum = 0;
// for (let i = 1; i <= 50; i++) {
//   sum += i;
// }
// console.log("The sum of numbers from 1 to 50 is:", sum);

// let sum = 0;
// let i = 1;

// while (i <= 50) {
//   sum += i;
//   i++;
// }
// console.log("The sum of numbers from 1 to 50 is:", sum);


let iteration = 500;
// while (iteration > 1000) {
//   console.log(iteration);
//   iteration -= 100;
// }
// console.log("Loop finished.");

// do{
//   console.log(iteration);
//   iteration -= 100; 
// }while (iteration > 1000){
//   console.log(iteration);
//   iteration -= 100;
// }

// console.log("Loop finished.");

// break — მთლიანად წყვეტს ციკლს
// for (let i = 0; i < 10; i++) {
// console.log(i); 
// if (i === 5) break; 
// }

for (let i = 0; i < 5; i++) {
  if (i === 2) continue; 
  console.log(i); // 0, 1, 3, 4
}

