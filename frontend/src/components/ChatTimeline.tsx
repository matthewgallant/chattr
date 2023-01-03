import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Message } from "../interfaces/MessageInterface"

const ChatTimeline = () => {
    let { id } = useParams()
    const [messages, setMessages] = useState<Message[]>([])

    const fetchChats = async () => {
        if (id) {
            const res = await fetch('/api/message/' + id, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')}` } })
            if (res.ok) {
                const data = await res.json()
                setMessages(data)
            }
        }
    }

    useEffect(() => {
        fetchChats()
    }, [id])

    return (
        <div className="ChatTimeline">
            {messages.map((message, index) => (
                <div className="Message" key={index}>{message.message}</div>
            ))}
        </div>
    )
}

export default ChatTimeline
