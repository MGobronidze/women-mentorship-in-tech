import { useState } from 'react'
import Card from './components/Card'
import './App.css'
import Product from './components/Product'
import Counter from './components/Counter'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Product
        name="ყურსასმენი"            // სტრიქონი
        price={89.9}                  // რიცხვი
        inStock={true}                // boolean (მოკლედ: უბრალოდ  inStock )
        tags={["აუდიო", "უსადენო"]}   // მასივი
        seller={{ id: 7, name: "ლანა" }}  // ობიექტი (გარე {} — JSX, შიდა {} — ობიექტი)
        onBuy={() => alert("ნაყიდია!")}  // ფუნქცია
      />
      <Counter />
    </>
  )
}

export default App
