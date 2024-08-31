import React,{useState,useEffect} from 'react'
import Card from '../components/Card'

const Orders = () => {
  const [pizzas, setPizzas] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/pizzaData", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      setPizzas(data.Pizza_Data);
    } catch (err) {
      console.error("Something went wrong",err)
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div name="orders" className='w-full'>
      <div className='mx-6 mt-4 mb-2 px-2 pt-2 font-bold text-2xl'>Veg Pizza</div>
      <hr className='w-[95vw] h-[1.5px] mx-auto bg-gray-600 border-none'/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {pizzas.filter(item=>item.Category==='Veg').map((item)=>(
          <Card
          key={item._id}
          _id={item._id}
          name={item.name}
          img={item.img}
          options={item.options}
          />
        ))}
      </div>
      
      <div className='mx-6 mt-4 mb-2 px-2 pt-2 font-bold text-2xl'>Non-Veg Pizza</div>
      <hr className='w-[95vw] h-[1.5px] mx-auto bg-gray-600 border-none'/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {pizzas.filter(item=>item.Category==='Non-Veg').map((item)=>(
          <Card
          key={item._id}
          _id={item._id}
          name={item.name}
          img={item.img}
          options={item.options}
          />
        ))}
      </div>
    </div>
  )
}

export default Orders