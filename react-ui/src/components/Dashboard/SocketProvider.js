import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    let url = `${window.location.hostname}`;
    if (url.startsWith('localhost')) {
      url += ':5000';
      url = `http://${url}`;
    } else {
      url = `https://${url}`;
    }
    console.log(url);
    const newSocket = io(
      url,
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
