import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

import ChatTimeline from './ChatTimeline'
import ChatBox from './ChatBox'

import { Message } from "../interfaces/MessageInterface"

const ChatWindow = () => {
    let { id } = useParams()
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
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
        // Fetch chats on initial load
        fetchChats()

        // Setup interval to fetch messages periodically
        const interval = setInterval(() => {
            fetchChats()
        }, 2500);

        return () => clearInterval(interval);
    }, [id])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    return (
        <div className="ChatWindow">
            <ChatTimeline messages={messages} />
            <ChatTimeline messages={messages} messagesEndRef={messagesEndRef} />
            <ChatBox messages={messages} setMessages={setMessages} />
        </div>
    )
}

export default ChatWindow
