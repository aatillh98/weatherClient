import { useEffect, useState } from "react";
import axios from "axios";



const App = () => {

  const [input, setInput] = useState('');
  const [data, setData] = useState({});

  const handleClick = async (e) => {
    if (input === '') return;

    const url = `http://localhost:5000/location/${input}/`;
    const response = await axios.get(url);
    // console.log(response)
    setData(response.data)
  }


  return (
    <>
      <div className="mx-auto p-4 bg-purple-400 h-screen flex justify-center">
        <div className="flex flex-wrap">
          <div className="ml-2 flex items-center justify-center ">
            <div className="flex border-2 border-gray-200 rounded">
              <input type="text" className="px-4 py-2 w-80 focus:outline-none" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your Location" />
              <button className="px-4 text-white bg-gray-500 border-l" onClick={handleClick}>
                Get Weather
              </button>
            </div>
          </div>
          <div className="w-full px-2">
            <div className="bg-gray-500 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full dark:bg-gray-600">
              <div className="px-6 py-6 relative">
                <div className="flex mb-4 justify-between items-center">
                  <div>
                    <h5 className="mb-0 font-medium text-xl">{data.title}</h5>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6 relative">
                <div className="text-center justify-between items-center flex">
                  {data?.consolidated_weather?.map((item, i) => (
                    <div className="text-center mb-0 flex items-center justify-center flex-col" key={i}>
                      <span className="block my-1">{item.applicable_date}</span>
                      <img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" />
                      <span className="block my-1">{item.predictability}°</span>
                      <div className="block sm:flex justify-between items-center flex-wrap">
                        <div className="w-full sm:w-1/2">
                          <div className="mb-2 justify-between items-center"><span>Temp min</span><small className="px-2 inline-block">{Number(item.min_temp).toFixed(2)}°</small></div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="mb-2 justify-between items-center"><span>Temp max</span><small className="px-2 inline-block">{Number(item.max_temp).toFixed(2)}°</small></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
