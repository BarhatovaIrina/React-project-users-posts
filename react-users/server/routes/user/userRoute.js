import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) res.sendStatus(401)

    const token = authHeader.split(' ')[1] // убирает Bearer
    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}
router.get('/', authMiddleware, (req, res) => {
    res.json({ "ok": true, path: "auth", user: req.user })
})

router.post('/reg', async (req, res) => {
    const { email, name, pwd, age, city } = req.body
    try {
        let foundUser = await prisma.user.findMany({
            where: {
                email: email
            }
        })
        if (foundUser && Array.isArray(foundUser) && foundUser.length > 0) {
            res.json({ "ok": false, "errorMsg": "Такой пользователь уже существует" })
        }
        await bcrypt.hash(pwd, 3, async (err, hashedPwd) => {
            let createdUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    pwd: hashedPwd
                }
            })
            let token = jwt.sign(createdUser, 'secret_key')
            res.json({ "ok": true, token: token, user: createdUser })
        })
        prisma.$disconnect()
        return
    }
    catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
    // console.log(name + " = " + email)
    //  res.json({ "ok": true, "name": name, "email": email })
    return

})

export default router;