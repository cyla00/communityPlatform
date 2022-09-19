const axios = require('axios')

const calculateRank = (xp:number, rank:number) =>  {

    const xp_needed = rank * 10 + 10
    
    if(xp >= xp_needed){
        rank ++
        const auth = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = {id: localStorage.getItem('id'), rank: rank}
        axios.post('http://localhost:3000/api/update-rank', data, auth).catch((err:any) => {
            return
        })
    }
    return rank
}

export default calculateRank