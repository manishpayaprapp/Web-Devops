import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function sendMessage() {
    if (!socket || !inputRef.current) {
      return
    }

    const message = inputRef.current.value
    socket.send(message)
  }

  useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080')

  ws.onopen = () => {
    setSocket(ws)
  }

  ws.onmessage = (ev) => {
    alert(ev.data)
  }

  return () => {
    ws.close()
  }
}, [])

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Message" />
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default App