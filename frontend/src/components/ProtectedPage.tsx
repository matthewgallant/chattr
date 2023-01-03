import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode
}

const ProtectedPage = (props: Props) => {
    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/login')
        }
    }, [])
    
    return (
        <>{props.children}</>
    )
}

export default ProtectedPage
