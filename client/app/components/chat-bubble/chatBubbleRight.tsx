import React from 'react'

interface Props {
    username: string,
    timestamp: number,
    message: string,
}

const ChatBubbleRight = (props: Props) => {
    const {username, timestamp, message} = props;
    const time = new Date(timestamp).toLocaleString();
    return (
        <>
            <div className="chat chat-end">
                <div className="chat-header">
                    {username}
                </div>
                <div className="chat-bubble">{message}</div>
                <div className="chat-footer opacity-50">
                    <time className="text-xs opacity-50">{time}</time>
                </div>
            </div>
        </>
    )
}

export default ChatBubbleRight
