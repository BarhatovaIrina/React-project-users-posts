import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/user/:id', (req, res) => {
    const { id } = req.params.id
    return res.send(`It is about user id=${id}!!`)
})

// router.post('/user/register', async (req, res) => {

// })

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