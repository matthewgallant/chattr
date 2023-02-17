interface Props {
    channelName: string | undefined
}

const ChatHeader = (props: Props) => {
    return (
        <div className="ChatHeader">
            {props.channelName}
        </div>
    )
}

export default ChatHeader
