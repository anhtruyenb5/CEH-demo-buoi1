import jwt from "jsonwebtoken"

const createToken = (data) => {
    return jwt.sign({ data: data }, "BI_MAT", { expiresIn: "5y" })
}
const checkToken = token => jwt.verify(token, "BI_MAT", error => error)

const decodeToken = (token) => {
    return jwt.decode(token)
}

const verifyToken = (req, res, next) => {
    let { token } = req.headers;
    const error = checkToken(token)
    if (error == null) {
        next()
        return;
    };
    res.status(401).send(error.name)
}

export {
    createToken,
    checkToken,
    decodeToken,
    verifyToken
}