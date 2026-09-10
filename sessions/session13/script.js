const card = {
  title: "ჩემი ბარათი",

  // ჩვეულებრივი ფუნქცია — this ეხება იმას, ვინც ფუნქციას "იძახებს" (card ობიექტს)
  showRegular: function() {
    console.log(this.title); // "ჩემი ბარათი" — this === card
  },

  // Arrow function — this "სესხულობს" გარე (გლობალურ) scope-ს, არა card-ს!
  showArrow: () => {
    console.log(this.title); // undefined — this აქ არ არის card
  },
};

card.showRegular(); // "ჩემი ბარათი"
card.showArrow();    // undefined