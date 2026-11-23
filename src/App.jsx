import { useState, useEffect, useRef } from "react"
import Message from "./components/Message"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const chatEndRef = useRef(null)

  const sendMessage = () => {
  if (!input.trim()) return

  const userMessage = input.trim()

  const newMessage = {
    text: userMessage,
    sender: "user"
  }

  // Item IDs are positive integers; reject anything else before calling the API
  if (!/^\d+$/.test(userMessage)) {
    setMessages(prev => [
      ...prev,
      newMessage,
      { text: "Please enter a valid numeric item ID (e.g., 37362).", sender: "bot" }
    ])
    setInput("")
    return
  }

  setMessages(prev => [
    ...prev,
    newMessage,
    { text: "Typing...", sender: "bot", typing: true }
  ])

  setInput("")

  fetch(`https://v2.xivapi.com/api/sheet/Item/${userMessage}?fields=Name,Description`)
    .then(response => {
      if (response.status === 404) {
        throw new Error("not_found")
      }
      if (!response.ok) {
        throw new Error("api_error")
      }
      return response.json()
    })
    .then(data => {
      const description = data.fields.Description?.trim()

      const result = description
        ? `${data.fields.Name}\n${description}`
        : `${data.fields.Name}\n(No description available)`

      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.typing)

        return [
          ...withoutTyping,
          {
            text: result,
            sender: "bot"
          }
        ]
      })
    })
    .catch(error => {
      const errorText =
        error.message === "not_found"
          ? `No item found with ID ${userMessage}.`
          : "Error consulting the XIVAPI."

      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.typing)

        return [
          ...withoutTyping,
          {
            text: errorText,
            sender: "bot"
          }
        ]
      })
    })
}
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])
  return (
    <div style={styles.container}>
      <h1>FFXIV Item ID Search</h1>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Message
            key={index}
            msg={msg}
          styles={styles}
    />
  ))}

  <div ref={chatEndRef} />
</div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage()
          }
        }}
      placeholder="Type the item's ID (e.g., 37362)"
/>

        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial",
    backgroundColor: "#1e1e2f",
    color: "white",
    borderRadius: "16px"
  },
  chatBox: {
    height: "400px",
    border: "1px solid #444",
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    marginBottom: "20px",
    backgroundColor: "#12121c"
  },
  message: {
    maxWidth: "70%",
    padding: "12px",
    borderRadius: "15px",
    whiteSpace: "pre-line"
  },
  inputArea: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#2a2a3d",
    color: "white"
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  }
}

export default App
