export const middleware = {
    response: (res, data, message, code) => {
        res.status(code).json({
            statusCode: code,
            data: data,
            message: message,
            date: new Date()
        })
    },
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
            return middleware.response(res, "", "Invalid email", 400);;

        if (!req.body.password)
            return middleware.response(res, "", "Invalid password", 400);;
        next();
    },
    checkSignUpRequest: (req, res, next) => {
        if (!req.body.userName)
            return middleware.responses(res, 400, "Invalid userName");
        if (!req.body.password)
            return middleware.responses(res, 400, "Invalid password");
        if (!req.body.email)
            return middleware.responses(res, 400, "Invalid email");
        if (!req.body.phoneNumber)
            return middleware.responses(res, 400, "Invalid phone number");
        if (!req.body.fullName)
            return middleware.responses(res, 400, "Invalid fullname");

        next();
    },
    checkSession: (req, res, next) => {
        if (req.session.user && req.session.user.userId) {
            next();
        } else {
            middleware.response(res, "", "Unauthorized access", 401);
        }
    }
}