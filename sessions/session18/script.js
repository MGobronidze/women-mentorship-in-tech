const fetchUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // შეცვალეთ true ან false წარმატების/წარუმატებლობის დასადგენად
    if (success) {
      resolve({ name: "ჯონი", id: 1 }); // წარმატება
    } else {
      reject(new Error("მომხმარებელი ვერ მოიძებნა")); // შეცდომა
    }
  }, 1000);
});
fetchUser
  .then((user) => console.log("მიღებულია:", user))
  .catch((error) => console.error("შეცდომა:", error.message))
  .finally(() => console.log("დასრულდა (წარმატებით ან არა)"));
