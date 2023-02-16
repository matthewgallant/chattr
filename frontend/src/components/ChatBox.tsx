import { useState } from "react"
import { useParams } from "react-router-dom"

import { Message } from "../interfaces/MessageInterface"

import { FaPaperPlane } from "react-icons/fa"

interface Props {
    messages: Message[],
    setMessages: Function
}

const ChatBox = (props: Props) => {
    let { id } = useParams()
    const [message, setMessage] = useState("")

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const fetchData = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                channel: id
            })
        }
        
        // Send message to backend
        fetch('/api/message', fetchData)
            .then(() => {
                // Clear text field
                setMessage("")

                // Temporarily add message to local messages
                props.setMessages([...props.messages, { message: message }])
            })
            .catch(err => console.error(err))
    }

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }

    return (
        <form className="ChatBox" onSubmit={onSubmit}>
            <input type="text" value={message} onChange={onChange} placeholder="Send a message..." className="ChatBox__field" />
            <button type="submit" className="ChatBox__button">
                <FaPaperPlane />
            </button>
        </form>
    )
}

export default ChatBox
