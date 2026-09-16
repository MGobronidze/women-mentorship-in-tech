// function sum(...numbers) {
//   console.log(numbers); 
//   return numbers.reduce((total, n) => total + n, 0);
// }

// console.log(sum(1, 2));        // 3
// console.log(sum(1, 2, 3, 4));  // 10 — ნებისმიერი რაოდენობის არგუმენტი

// // rest ყოველთვის ბოლოშია, სხვა პარამეტრებთან ერთად:
// function introduce(first, second, ...others) {
//   console.log(first, second, others);
// }
// introduce("ა", "ბ", "გ", "დ"); // "ა" "ბ" ["გ", "დ"]

// // მასივების გაერთიანება/კოპირება
// const fruits = ["ვაშლი", "მსხალი"];
// const moreFruits = [...fruits, "ბანანი"]; // ["ვაშლი", "მსხალი", "ბანანი"]
// console.log(moreFruits);

// // ობიექტების გაერთიანება/კოპირება
// const student = { 
//   name: "ანა", 
//   age: 22 
// };
// const updated = { ...student, age: 23 }; // { name: "ანა", age: 23 } — ხელახლა ჩაწერილი "age" გადაფარავს ძველს
// console.log(updated);
// // ფუნქციის გამოძახებისას მასივის "დაშლა" ცალკეულ არგუმენტებად
// const nums = [4, 9, 16];
// Math.max(...nums); // 16

// const tags = ["JS", "CSS", "JS", "HTML", "CSS"];

// const uniqueTags = [...new Set(tags)];
// console.log(uniqueTags); // ["JS", "CSS", "HTML"] — დუბლიკატების გარეშე, თანმიმდევრობა შენარჩუნებულია

// const project = { 
//   title: "საიტი", 
//   meta: { 
//     year: 2025 
//   } 
// };
// const copy = { ...project };

// copy.title = "ახალი სახელი";   
// copy.meta.year = 2026;        

// console.log(project.title);
// console.log(copy.title); // 2026 — მოულოდნელად შეიცვალა!
// console.log(project.meta.year); // 2026 — მოულოდნელად შეიცვალა!

// მასივის destructuring — პოზიციის მიხედვით
// const coordinates = [42.31, 43.36];
// const [lat, lng] = coordinates;
// console.log(lat, lng); // 42.31 43.36

// // ობიექტის destructuring — key-ის სახელის მიხედვით
const student = { 
  name: "ანა", 
  age: 22,
  city: "თბილისი" 
};
// // const { name, age } = student;
// // console.log(name, age); // "ანა" 22

// // // გადარქმევა და ნაგულისხმევი მნიშვნელობა
// // const { name: studentName, country = "საქართველო" } = student;
// // console.log(studentName, country); // "ანა" "საქართველო" (country არ არსებობდა, ნაგულისხმევი გამოიყენა)

// const { name: n, ...restInfo } = student;
// console.log(n);        // "ანა"
// console.log(restInfo);  // { age: 22, city: "თბილისი" } — ყველაფერი, name-ის გარდა

// const [first, ...rest] = [1, 2, 3, 4];
// console.log(first, rest); // 1 [2, 3, 4]

// const project = {
//   title: "პორტფოლიოს საიტი",
//   meta: { 
//     year: 2026, 
//     tags: ["HTML", "CSS"] 
//   },
// };

// const {
//   title,
//   meta: { year, tags: [firstTag, secondTag] }, // ჩადგმული ობიექტიდან, ჩადგმული მასივის პირველი ელემენტი
// } = project;
// console.log("---------")
// console.log(project.meta.tags[0]); // "HTML"
// console.log("-----------")
// console.log(project.meta.tags[1]); // "CSS"
// console.log("-----------")
// console.log(title, year, firstTag, secondTag); // "პორტფოლიოს საიტი" 2026 "HTML" "CSS"

function printStudent({ name, age = "უცნობი" }) {
  console.log(`${name}, ${age} წლის`);
}
printStudent(student);