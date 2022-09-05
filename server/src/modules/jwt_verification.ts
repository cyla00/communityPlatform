const jwt = require('jsonwebtoken')

export function jwt_verification(req:any, res:any, next:any){
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY, (err:any, user:any) => {
        if(err) return res.sendStatus(401)
        if(user.authority == 'admin' && !user.is_admin) return res.sendStatus(401)
        if(user.authority == 'staff' && !user.is_staff) return res.sendStatus(401)
        if(user.authority == 'users' && user.is_staff) return res.sendStatus(401)
        if(user.authority == 'users' && user.is_admin) return res.sendStatus(401)
        next()
    })
}