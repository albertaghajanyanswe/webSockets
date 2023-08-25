import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import constants from '../constants';

const WebSockRoom = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    function connect(e) {
        e.preventDefault();
        socket.current = new WebSocket(`${constants.wsServerHost}:${constants.wsServerPort}`);

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                roomId,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
        socket.current.onclose= () => {
            console.log('Socket closed');
        }
        socket.current.onerror = () => {
            console.log('Socket an error has occurred');
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        const message = {
            username,
            roomId,
            message: value,
            id: Date.now(),
            event: 'message',
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }


    if (!connected) {
        return (
            <div className="center">
                <form onSubmit={connect} className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Enter username"/>
                    <input
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                        type="text"
                        placeholder="Enter room ID"/>
                    <button onClick={connect}>Connect</button>
                </form>
            </div>
        )
    }


    return (
        <div className="center">
            <div>
                <form onSubmit={sendMessage} className="form">
                    <input placeholder="Enter message" value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send</button>
                </form>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    User {mess.username} connected
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSockRoom;
