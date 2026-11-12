import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // [მიმდინარე მნიშვნელობა, განახლების ფუნქცია]

  return (
    <div>
      <p>დაწკაპუნებულია: {count} ჯერ</p>
      <button onClick={() => setCount(count + 1)}>
        დაწკაპუნება
      </button>
    </div>
  );
}
export default Counter;