import { useState } from 'react'

const LoginPage = () => {
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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        fetch('/api/account/login', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
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
