import { Link } from "react-router-dom"
import { Channel } from "../interfaces/ChannelInterface"

interface Props {
    channels: Channel[];
}

const Sidebar = (props: Props) => {
    return (
        <div className="Sidebar">
            <div className="Sidebar-logo">Logo</div>
            <div className="Sidebar-channels">
                {props.channels.map((channel, index) => 
                    <div key={(index)}>
                        <Link to={"/channel/" + channel._id} className="Sidebar-channel">{channel.name}</Link>
                    </div>
                )}
            </div>
            <div className="Sidebar-account">Account</div>
        </div>
    )
}

export default Sidebar
