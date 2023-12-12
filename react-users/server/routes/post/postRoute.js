import express from 'express'
import { PrismaClient } from '@prisma/client'
// import { Api } from '../services/Api'

// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
// const JWTSecretKey = 'secret_key'

router.get('/getposts', async (req, res) => {
    const { userId } = req.query
    // console.log(userId)
    try {
        let _posts = []
        if (userId !== 'undefined') { // getPostsByUserData
            // console.log('user')
            _posts = await prisma.post.findMany({
                select: {
                    id: true,
                    post_title: true,
                    post_body: true,
                    userId: true,
                    author_id: {
                        select: {
                            name: true,
                            email: true,
                            id: true
                        }
                    }
                },
                where: {
                    userId: typeof userId === 'string' ? Number(userId) : userId
                }
            })
        } else {
            // console.log('unde')
            _posts = await prisma.post.findMany({
                select: {
                    id: true,
                    post_title: true,
                    post_body: true,
                    author_id: {
                        select: {
                            name: true,
                            email: true,
                            id: true
                        }
                    }
                }
            })
        }

        res.json({ "ok": true, posts: _posts })
        prisma.$disconnect()
    } catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
})

router.post('/create', async (req, res) => {
    const { post_title, post_body, uid } = req.body
    // console.log('create', post_title, post_body, uid)
    try {
        let _post = await prisma.post.create({
            data: {
                post_title: post_title,
                post_body: post_body,
                userId: typeof uid === 'string' ? Number(uid) : uid
            }
        })

        res.json({ "ok": true, post: _post })
        prisma.$disconnect()
        return
    }
    catch (error) {
        res.json({ "ok": false, "errorMsg": error })
    }
    return
})

export default router;