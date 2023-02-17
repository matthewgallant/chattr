import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

import ChatTimeline from './ChatTimeline'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'

import { Message } from "../interfaces/MessageInterface"
import { Channel } from "../interfaces/ChannelInterface"

interface Props {
    channels: Channel[]
}

const ChatWindow = (props: Props) => {
    let { id } = useParams()
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [channelName, setChannelName] = useState<string | undefined>("")

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
        setChannelName(props.channels.find(channel => channel._id === id)?.name)
    }, [props.channels, id])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="ChatWindow">
            <ChatHeader channelName={channelName} />
            <ChatTimeline messages={messages} messagesEndRef={messagesEndRef} />
            <ChatBox messages={messages} setMessages={setMessages} />
        </div>
    )
}

export default ChatWindow
