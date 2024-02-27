import axios from 'axios'

const REGISTER_API_URL = `/api/users/register`
const LOGIN_API_URL = `/api/users/login`
const UPDATE_API_URL = `/api/users/update`

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

// Update User Details
const update = async (userData) => {
    try {
        const response = await axios.put(UPDATE_API_URL, userData)
        console.log(response)
        if(response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
    } catch (error) {
        console.log('failed to update slice')
    }
    
}

const authService = {
    register,
    logout,
    login,
    update
}

export default authService