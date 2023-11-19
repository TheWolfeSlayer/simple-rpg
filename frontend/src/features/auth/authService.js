import axios from 'axios'

const REGISTER_API_URL = `/api/users/register`
const LOGIN_API_URL = `/api/users/login`

// Register user
const register = async (userData) => {
    const response = await axios.post(REGISTER_API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
} 

// Login user
const login = async (userData) => {
    const response = await axios.post(LOGIN_API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
} 

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService