import { useState } from 'react'
import Card from './components/Card'
import './App.css'
import Product from './components/Product'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Card title="React წიგნი" price={35} />
      <Product
          name="ყურსასმენი"            // სტრიქონი
          price={89.9}                  // რიცხვი
          inStock={true}                // boolean (მოკლედ: უბრალოდ  inStock )
          tags={["აუდიო", "უსადენო"]}   // მასივი
          seller={{ id: 7, name: "ლანა" }}  // ობიექტი (გარე {} — JSX, შიდა {} — ობიექტი)
          onBuy={() => alert("ნაყიდია!")}  // ფუნქცია
        />
    
    </>
  )
}

export default App
