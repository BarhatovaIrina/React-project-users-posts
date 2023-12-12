import { Button, Textarea, Box, Input, useToast } from "@chakra-ui/react"
import './AddPostPanel.css'
import { useState } from "react"
import { Api } from '../../services/Api'
import { useDispatch, useSelector } from "react-redux"
import { getPostsByUserData } from "../../store/reducers/postAuthReducer"

export const AddPostPanel = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const { user } = useSelector((state) => state.user)
    const toast = useToast()
    const dispatch = useDispatch()
    // const { posts_user, isLoaging } = useSelector((state) => state.posts_user);

    const handleSendPost = () => {
        if (!title || !body) {
            toast({
                title: 'Внимание!',
                description: "Заполните все поля",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        let _data = {
            post_title: title,
            post_body: body,
            uid: user.id
        }
        Api.createPost(_data).then(res => {
            if (res.status === 200 && res?.data && res.data.ok) {
                setTitle('')
                setBody('')
                // console.log(res.data)
                dispatch(getPostsByUserData({ loaded: true, posts_user: res.data.posts }))
            }
        })
    }

    return (
        <Box className="container">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea className="textarea" placeholder="Content" value={body} onChange={(e) => setBody(e.target.value)} />
            <Button size={'sm'} onClick={() => handleSendPost()}>Запостить</Button>
        </Box >
    )
}