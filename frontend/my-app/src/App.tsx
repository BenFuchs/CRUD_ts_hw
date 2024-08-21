import React, { useEffect, useState } from 'react';
import { Cars } from './Car_model';
import axios from 'axios';

function App() {

  const SERVER = 'http://127.0.0.1:8000/cars/'

  const [car, setcar] = useState<Cars[]>([])
  const [brand, setbrand] = useState<String>('')
  const [color, setcolor] = useState<String>('')
  const [year, setyear] = useState<Number>(0)
  const [refreshFlag, setrefreshFlag] = useState<Boolean>(false)

  /**Follows the refresh flag which switches everytime an action that would require a refresh happens, recalls the getData() function */
  useEffect(() => {
    getData()
  }, [refreshFlag])

  /**
   * axios get request, gets all of the cars from the server and sets the to car variable
   */
  const getData = () => {
    axios(SERVER).then(res => setcar(res.data))
  }

  const addCar = () => {
    const tempCar = {
      brand: brand,
      color: color,
      year: year,
    };
  
    axios.post(SERVER, tempCar)
      .then((res) => {
        console.log('Car added successfully:', res.data);
        getData(); // Refresh the car list
      })
      .catch((err) => {
        console.error('Error adding car:', err);
      });
      setrefreshFlag(!refreshFlag)
  };

  const delCar=(id: Number = -1)=> {
    // console.log(id)
    axios.delete(SERVER + id + '/').then(res=> {
      console.log("item deleted")
      setrefreshFlag(!refreshFlag)
    })
  }

const updCar=(id: Number = -1, car: Cars)=>{
  console.log("item updated")
  axios.put(SERVER + id + '/', car).then(res=> {setrefreshFlag(!refreshFlag)})
}


  return (
    <div >
      <h1>Cars List:</h1> 
      <hr />
      Car Brand: <input type='text' onChange={(e)=>setbrand(e.target.value)}/> | 
      Car Color: <input type='text' onChange={(e)=>setcolor(e.target.value)}/> | 
      Car Year: <input type='number' onChange={(e)=>setyear(Number(e.target.value))}/> | {''} 
      <button onClick={()=>addCar()}>Add Car</button>

      <hr/>
      {brand} -- {color} -- {String(year)}
      {car.map((item, index) => <div>
        {/* List start */}
        <ul>
          <li key={index}> {item.brand} - {item.color} - {String(item.year)}
              <button onClick={()=>delCar(item.id)}>DELETE</button>
              <button onClick={()=>updCar(item.id, {brand: brand, color: color, year: year})}>UPDATE</button>
          </li>
        </ul>
        {/* List end */}
      </div>)}
    </div>
  );
}

export default App;
