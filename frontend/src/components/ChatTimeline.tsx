import { Message } from "../interfaces/MessageInterface"

interface Props {
    messages: Message[]
}

const ChatTimeline = (props: Props) => {
    return (
        <div className="ChatTimeline">
            {props.messages.map((message, index) => (
                <div className="Message" key={index}>{message.message}</div>
            ))}
        </div>
    )
}

export default ChatTimeline
