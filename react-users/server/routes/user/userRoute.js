import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWTSecretKey = 'secret_key'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) res.sendStatus(401)

    const token = authHeader.split(' ')[1] // убирает 'Bearer'
    jwt.verify(token, JWTSecretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}
/**
 * @openapi
 * /auth/:
 *  get:
 *      tags:
 *          - User
 *      description: Get message
 *      responses:
 *          200:
 *              description: return message
 *          401:
 *              description: Пользователь не авторизован
 * 
 */
router.get('/', authMiddleware, (req, res) => {
    res.json({ "ok": true, path: "auth", user: req.user })
})

router.get('/getuser', async (req, res) => {
    const { userId } = req.query
    // console.log(userId)
    if (!userId) res.json({ 'ok': false, errorMsg: 'Не найден id пользователя' })
    let foundUser = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            age: true,
            city: true,
            // posts: true,
            posts: {
                select: {
                    id: true,
                    post_title: true,
                    post_body: true
                }
            },
            _count: {
                select: {
                    posts: true
                }
            }
        },
        where: {
            id: typeof userId === 'string' ? Number(userId) : userId
        }
    }) || []
    // console.log('f=', foundUser)
    if (foundUser && Array.isArray(foundUser)) {
        res.json({ "ok": true, "user": foundUser, loaded: true })
    }
    return
})

/**
 * @openapi
 * /auth/reg:
 *  post:
 *      tags:
 *          - User
 *      description: Регистрация пользователя
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      requred:
 *                              - email
 *                              - pwd
 *                              - age
 *                              - name
 *                              - city
 *                      properties:
 *                              email: 
 *                                  type: string
 *                                  default: 1@mail.ru
 *                              name: 
 *                                  type: string
 *                                  default: username
 *                              pwd: 
 *                                  type: string
 *                                  default: 123
 *                              age: 
 *                                  type: number
 *                                  default: 20
 *                              city: 
 *                                  type: string
 *                                  default: Moscow
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - name
 *                              - pwd
 *                              - age
 *                              - city
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  default: 1@mail.ru
 *                              name:
 *                                  type: string
 *                                  default: username
 *                              age: 
 *                                  type: number
 *                                  default: 20
 *                              city: 
 *                                  type: string
 *                                  default: Moscow
 * 
 */
router.post('/reg', async (req, res) => {
    const { email, name, pwd, age, city } = req.body
    // console.log('server user')
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
            let token = jwt.sign(createdUser, JWTSecretKey)
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

router.post('/login', async (req, res) => {
    const { email, pwd } = req.body
    console.log('server user')
    try {
        let foundUser = await prisma.user.findMany({
            where: {
                email: email
            }
        })
        if (foundUser && Array.isArray(foundUser) && foundUser.length > 0) {
            await bcrypt.compare(pwd, foundUser[0].pwd, (err, result) => {
                if (result) {
                    const token = jwt.sign(foundUser[0], JWTSecretKey)
                    res.json({ 'ok': true, user: foundUser[0], token: token })
                }
                else res.json({ "ok": false, "errorMsg": err })
            })
        }
        else {
            res.json({ "ok": false, "errorMsg": "Такой пользователь не существует" })

        }
        //     let token = jwt.sign(createdUser, 'secret_key')
        //      res.json({ "ok": true, token: token, user: createdUser })
        //   })
        prisma.$disconnect()
        // return
    }
    catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
    // console.log(name + " = " + email)
    //  res.json({ "ok": true, "name": name, "email": email })
    return

})

export default router;