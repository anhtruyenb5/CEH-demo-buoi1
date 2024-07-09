import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { response } from "../config/response.js";
import { createToken } from "../config/jwt.js";

const prisma = new PrismaClient();

const getUserDataFromDB = (req) => {
    let { fullName } = req.body
    return new Promise((resolve, reject) => {
        prisma.users
            .findMany({
                where: {
                    full_name: fullName
                }
            })
            .then(users => {
                if (users && users.length > 0) {
                    resolve(users);
                } else {
                    reject(new Error('Không tìm thấy người dùng'));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getUser = (req, res, next) => {
    getUserDataFromDB(req)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const signUp = async (req, res) => {
    let { fullName, email, password } = req.body;

    let checkEmail = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    if (checkEmail) {
        response(res, "", "Email đã tồn tại", 400);
        return;
    }
    let hashPassword = bcrypt.hashSync(password, 10)
    let newData = {
        full_name: fullName,
        email: email,
        pass_word: hashPassword
    }
    await prisma.users.create({
        data: newData
    })
    response(res, "", "Đăng ký thành công", 200);
    console.log(res.body)
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let checkEmail = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if (checkEmail) {
            if (bcrypt.compareSync(password, checkEmail.pass_word)) {
                let token = createToken({ userId: checkEmail.id })
                req.session.user = { userId: checkEmail.id, email: checkEmail.email }
                response(res, token, "Đăng nhập thành công", 200);
                console.log(req.session.user)
            }
            else {
                response(res, "", "Mật khẩu không đúng", 400);
            }
        } else {
            response(res, "", "Email không đúng", 400);
        }
    } catch (error) {
        response(error, "", "Đã có lỗi xảy ra", 500);
    }

}

export {
    getUser,
    signUp,
    login
}