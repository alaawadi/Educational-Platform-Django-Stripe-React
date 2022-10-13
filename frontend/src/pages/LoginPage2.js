import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage2 = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div align="center">
            <br></br><br></br><br></br><br></br><br></br>
            <h1>login</h1>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <br></br>
                <br></br>
                <input type="password" name="password" placeholder="Enter Password" />
                <br></br>
                <br></br>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage2