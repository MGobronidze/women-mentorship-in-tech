// const fruits = ["ვაშლი", "მსხალი", "ბანანი"];
// for (const fruit of fruits) {
//   console.log(fruit);
// }

// console.log(fruits[0]);     // "ვაშლი"
// console.log(fruits[1]);     // "მსხალი"
// console.log(fruits[2]);     // "ბანანი"

// console.log(fruits);
// let lastIndex = fruits.length - 1; 
// console.log(lastIndex);  
// console.log(fruits[lastIndex]);  // "ბანანი"

// fruits[1] = "ატამი";  
// console.log(fruits);  // ["ვაშლი", "ატამი", "ბანანი"]\

// fruits.push("ანანასი");
// console.log(fruits);  // ["ვაშლი", "ატამი", "ბანანი", "ანანასი"]

// fruits.pop();
// console.log(fruits);  // ["ვაშლი", "ატამი", "ბანანი"]

// fruits.unshift("მანგო");
// console.log(fruits);  // ["მანგო", "ვაშლი", "ატამი", "ბანანი"]

// fruits.shift();
// console.log(fruits);  // ["ვაშლი", "ატამი", "ბანანი"]

// const student = {
//   name: "გიორგი",
//   age: 22,
//   isEnrolled: true,
//   hobbies: ["კითხვა", "ცურვა"],  
// };

// for (const key in student) {
//   console.log(key, ":", student[key]); // bracket აუცილებელია, key ცვლადშია
// }

// console.log(student.age);
// console.log(student["age"]);
// console.log(student.hobbies[0]);  // "კითხვა"


// const student2 = student;  
// student2.name = "ნინო";
// student.age = 25;
// console.log(student);  
// console.log(student2); 

// const studentCopy = structuredClone(student);
// studentCopy.name = "თამარი";
// console.log(student);  
// console.log(studentCopy);

// console.log(student);  
// console.log(student.name); 
// console.log(student.age);
// console.log(student.isEnrolled);
// console.log(student.hobbies);
// console.log(student.hobbies[0]);  // "კითხვა"
// console.log(student.hobbies[1]);  // "ცურვა"

// console.log(Object.keys(student));  
// console.log(Object.values(student));
// console.log(Object.entries(student));

// for (const [key, value] of Object.entries(student)) {
//   console.log(`${key} --- ${value}`);
// }

// // Object.hasOwn() — თანამედროვე, უსაფრთხო გზა შემოწმებისთვის, აქვს თუ არა ობიექტს კონკრეტული key
// console.log(Object.hasOwn(student, "age"));   // true
// console.log(Object.hasOwn(student, "email")); // false

// const numbers = [1, 2, 3, 4, 5];

// // map — ქმნის ახალ მასივს, თითოეულ ელემენტზე ფუნქციის გამოყენებით
// const doubled = numbers.map(n => n+2)
// console.log(numbers); // [1, 2, 3, 4, 5]
// console.log(doubled); // [2, 4, 6, 8, 10]

// // filter — ქმნის ახალ მასივს, მხოლოდ პირობის დამაკმაყოფილებელი ელემენტებით
// const evens = numbers.filter(n => n % 2 === 0);
// console.log(evens); 
// const odds = numbers.filter(n => n % 2 === 1);
// console.log(odds); 
// console.log(numbers); 

// // forEach — უბრალოდ იმეორებს, ახალ მასივს არ აბრუნებს
// numbers.forEach(n => console.log(n));
// console.log("end of forEach");
// // find — აბრუნებს პირველ ელემენტს, რომელიც პირობას აკმაყოფილებს
// const firstEven = numbers.find(n => n % 5 === 4 ); // 2
// console.log(firstEven);

// // reduce — ს დაჰყავს მასივს ერთ მნიშვნელობაზე (მაგ. ჯამი)
// const sum = numbers.reduce((total, n) => total + n, 0); // 15
// console.log(sum);

// const original = [3, 1, 4, 1, 5];

// const sortedOriginal = original.sort(); 
// console.log(original); // [1, 1, 3, 4, 5] — ორიგინალი მასივი შეიცვალა!

// const newSorted = original.toSorted();
// console.log(newSorted); // [1, 1, 3, 4, 5] — ახალი მასივი
// console.log(original);  // [3, 1, 4, 1, 5] — ორიგინალი უცვლელია!

// const newReversed = original.toReversed();
// original.reverse(); // ორიგინალი მასივი შებრუნდა
// console.log(newReversed); // [5, 1, 4, 1, 3] — ახალი მასივი
// console.log(original);    // [3, 1, 4, 1, 5] — ორიგინალი უცვლელია!

// const original2 = [3, 1, 4, 1, 5];
// // ახალი, "უსაფრთხო" მეთოდი — ორიგინალს არ ეხება
// const sorted = original2.toSorted();    // [1, 1, 3, 4, 5] — ახალი მასივი
// console.log(original2);                       // [3, 1, 4, 1, 5] — უცვლელია!

// const reversed = original2.toReversed(); // ახალი, შებრუნებული ასლი
// const updated = original2.with(0, 99);    // ახალი ასლი, სადაც ინდექს 0-ს აქვს 99

const products = [
  { name: "წიგნი", category: "განათლება" },
  { name: "რვეული", category: "განათლება" },
  { name: "ყურსასმენი", category: "ტექნიკა" },
];
console.log(products);

const grouped = Object.groupBy(products, (p) => p.category);
// {
//   განათლება: [{name: "წიგნი", ...}, {name: "რვეული", ...}],
//   ტექნიკა: [{name: "ყურსასმენი", ...}]
// }
console.log(grouped);