function Message({ msg, styles }) {
  return (
    <div
      style={{
        ...styles.message,
        alignSelf:
          msg.sender === "user"
            ? "flex-end"
            : "flex-start",
        backgroundColor:
          msg.sender === "user"
            ? "#007bff"
            : "#33334d",
        color: "white"
      }}
    >
      {msg.text}
    </div>
  )
}

export default Message