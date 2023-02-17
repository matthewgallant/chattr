import { ForwardedRef } from "react"
import { Message } from "../interfaces/MessageInterface"

interface Props {
    messages: Message[],
    messagesEndRef: ForwardedRef<HTMLDivElement>
}

const ChatTimeline = (props: Props) => {
    return (
        <div className="ChatTimeline">
            {props.messages.map((message, index) => (
                <div className="Message" key={index}>{message.message}</div>
            ))}
            <div ref={props.messagesEndRef} />
        </div>
    )
}

export default ChatTimeline
