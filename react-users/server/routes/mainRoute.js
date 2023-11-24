import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => {
    return res.send('It is ok!')
})

router.get('/user/:id', (req, res) => {
    const { id } = req.params.id
    return res.send(`It is about user id=${id}!!`)
})

router.post('/user/register', async (req, res) => {
    const { email, name } = req.body
    try {
        let foundUser = await prisma.user.findMany({
            where: {
                email: email
            }
        })
        if (foundUser && Array.isArray(foundUser) && foundUser.length > 0) {
            res.json({ "ok": false, "errorMsg": "Такой пользователь уже существует" })
        }
        let createdUser = await prisma.user.create({
            data: {
                email: email,
                name: name
            }
        })
        res.json({ "ok": true, user: createdUser })
        console.log('foundUser: ', foundUser)
        prisma.$disconnect()
    }
    catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
    // console.log(name + " = " + email)
    return res.json({ "ok": true, "name": name, "email": email })
})

router.get('/post', async (req, res) => {
    try {
        let post = await prisma.post.findMany({
            // select: {
            //     post_title: true
            // }
        })
        return res.json({ "ok": true, "post": post })
    }
    catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
})

router.post('/post/create', async (req, res) => {
    const { post_title, post_body, user_id } = req.body
    try {
        let post = await prisma.post.create({
            data: {
                post_title: post_title,
                post_body: post_body,
                userId: typeof user_id === 'string' ? Number(user_id) : user_id
            }
        })
        res.json({ "ok": true, "post": post })
    }
    catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
})

export default router;