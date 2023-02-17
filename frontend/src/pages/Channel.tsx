import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import ProtectedPage from "../components/ProtectedPage"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"

import { Channel } from "../interfaces/ChannelInterface"

const ChannelPage = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const [channels, setChannels] = useState<Channel[]>([])

    useEffect(() => {
        fetch('/api/channel', { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')}` } })
            .then(res => res.json())
            .then(data => {
                setChannels(data)
                id == undefined && navigate('/channel/' + data[0]._id)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <ProtectedPage>
            <div className="ChannelPage">
                <Sidebar channels={channels} />
                <ChatWindow channels={channels} />
            </div>
        </ProtectedPage>
    )
}

export default ChannelPage
