const axios = require('axios')

const token_check = async () => {
  const token = localStorage.getItem('token')
  if(!token) {
    localStorage.clear()
    return window.location.href = '/login'
  }

  const tokenData = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  await axios.post('http://localhost:3000/api/token', {}, tokenData).catch((err:any) => {
    return window.location.href = '/login'
  })
}

export default token_check