import {useState} from 'react'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = {name, email}
        console.log(payload)
        // async request to the server
    }

    return (
        <div>
            <div>
                <h1>Login Page</h1>

                <form >
                    <div>
                        <div>
                            <label htmlFor="email">Username</label>
                            <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                        </div>
                    </div>
                    <button onClick={handleLogin} >login</button>
                </form>
            </div>
        </div>
    )
}
