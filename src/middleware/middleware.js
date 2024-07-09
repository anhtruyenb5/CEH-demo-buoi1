import { decodeToken } from "../config/jwt.js";
import { response } from "../config/response.js";

export const middleware = {
    errorHandle: (err, req, res, next) => {
        const statusCode = err.status || 500;

        res.status(statusCode).json({
            message: err.message,
            data: null,
            links: {
                docs: "https://doc.com/api",
            },
        });
    },
    checkLoginRequest: (req, res, next) => {
        if (!req.body.email)
            return response(res, "", "Invalid email", 400);;

        if (!req.body.password)
            return response(res, "", "Invalid password", 400);;
        next();
    },
    checkSignUpRequest: (req, res, next) => {
        if (!req.body.fullName)
            return response(res, "", "Invalid fullname", 400);;
        if (!req.body.email)
            return response(res, "", "Invalid email", 400);;
        if (!req.body.password)
            return response(res, "", "Invalid password", 400);;
        next();
    },
    checkSession: (req, res, next) => {
        if (req.session.user && req.session.user.userId) {
            next();
        } else {
            response(res, "", "Unauthorized access", 401);
        }
    }
}