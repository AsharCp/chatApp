// import './App.css';
import io from 'socket.io-client';
import { useEffect , useState  } from 'react';

const socket = io.connect("http://localhost:3001");

function App() {

  const [message,setMessage] = useState("");
  const [messageReceived,setMessageReceived] = useState("");

  const sendMessage=()=>{
    socket.emit("send_message",{message: message});
    setMessage("");

  };

  useEffect(() => {
    socket.on("receive_message",(data)=>{
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className='w-screen h-screen bg-black flex justify-center items-center rounded flex-col'>
      <h1 className='text-3xl p-4 font-bold text-white'>CHAT APP</h1>

      <div className="flex items-center justify-center bg-white p-10 h-64 rounded flex-col">
        <div className='flex flex-col'>

          <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-90 lg:w-96"
            type="text"  
            placeholder="Enter Message"
            value={message} 
            onChange={(event)=>{
            setMessage(event.target.value);
          }}>
          </input>
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
            
        </div>
          
          <p className='text-lg mt-5 font-bold ' > {messageReceived} </p>
          
      </div>
    </div>
    
    
  );
}

export default App;

// install client version of socket.io
// npm install socket.io-clinet
