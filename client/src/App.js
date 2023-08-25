import React from 'react';
import './app.css'
import LongPulling from "./components/LongPulling";
import EventSourcing from "./components/EventSourcing";
import WebSock from "./components/WebSock";
import WebSockRoom from './components/WebSockRoom';

function App() {

  return (
      <div>
        <WebSockRoom/>
      </div>
  )
}


export default App;
