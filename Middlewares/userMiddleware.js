import jwToken from 'jsonwebtoken'

// check jwToken -- User Authorization
const checkToken = async (req, res, next) => {
    try {
        const verifyToken = await jwToken.verify(req.headers.authorization, process.env.JWT_SECRET);

// console.log(verifyToken)
        // modify request -- verifytoken save in req.user
        if (verifyToken) {
            req.user = verifyToken;
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message:"Internal middleware Server Error "
       })
    }
}

export {checkToken}