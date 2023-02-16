import { Link } from "react-router-dom"
import { Channel } from "../interfaces/ChannelInterface"

interface Props {
    channels: Channel[];
}

const Sidebar = (props: Props) => {
    return (
        <div className="Sidebar">
            <Link to="/" className="Sidebar-logo">chattr</Link>
            <div className="Sidebar-channels">
                {props.channels.map((channel, index) => 
                    <div key={(index)}>
                        <Link to={"/channel/" + channel._id} className="Sidebar-channel">{channel.name}</Link>
                    </div>
                )}
            </div>
            <Link to="/account" className="Sidebar-account">Account</Link>
        </div>
    )
}

export default Sidebar
