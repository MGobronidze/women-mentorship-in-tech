// const header = document.getElementById('main-title')
// const card = document.querySelector('.card')
// const div = document.querySelector('#my-div')

// console.log(header)
// console.log(card)
// console.log(div)

// const newCard = document.createElement('div')
// newCard.classList.add('card')
// newCard.setAttribute('data-id', 'my-div')
// newCard.innerHTML = `
//   <h2>My New Card</h2>
//   <p>This is a new card created using JavaScript.</p>
// `
// const my_section = document.querySelector('.container')
// my_section.appendChild(newCard)

// newCard.remove()

const container = document.querySelector("#project-list");
console.log(container);

const fragment = document.createDocumentFragment(); // "უხილავი" კონტეინერი, ჯერ არ არის DOM-ში
const projects = [
  { id: 1,
    title: "Project 1" },
  { 
    id: 2,
    title: "Project 2" },
  { id: 3,
    title: "Project 3" },
];

for (const project of projects) {
  const li = document.createElement("li");
  li.textContent = project.title;
  li.classList.add("project-item");
  fragment.appendChild(li); // ემატება "უხილავ" fragment-ს — DOM ჯერ არ იცვლება
}

container.appendChild(fragment); // ერთი ოპერაცია — ბრაუზერი მხოლოდ ერთხელ "ითვლის" ხელახლა

