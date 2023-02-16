import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Attempt to send login data
        const res = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        // Return if an error occurred
        if (!res.ok) return
        
        // Parse data and save user JWT to Local Storage
        const data = await res.json()
        if (data.token) {
            await localStorage.setItem('user', JSON.stringify(data.token))
            navigate('/channel')
        } else {
            console.error("No token was sent back.")
        }
    }

    return (
        <div className="LoginPage">
            <form onSubmit={onSubmit} className="LoginForm">
                <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={formData.email}
                    onChange={onChange}  />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}  />
                <input
                    type="submit"
                    value="Login" />
            </form>
        </div>
    )
}

export default LoginPage
