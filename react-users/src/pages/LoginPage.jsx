import { Button, Text, Input, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../services/Api';
import { useDispatch } from 'react-redux';
import { saveUserAuthToStore } from '../store/reducers/userAuthReducer';
// import { getUsers } from "../../store/reducers/userReducer";

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState(undefined)
    const [pwd, setPwd] = useState(undefined)

    const toast = useToast()
    const handleToLogin = () => {
        if (!email || !pwd) {
            toast({
                title: 'Внимание',
                description: "Нужно заполнить обязательные поля",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        Api.login({ email, pwd }).then(res => {
            if (res.status === 200 && res?.data && res.data.ok) {
                toast({
                    title: 'Уведомление',
                    description: "Вы успешно авторизовались",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                dispatch(saveUserAuthToStore({ user: res.data.user, loaded: true }))
                Api.setValueToLocalStorage('token', res.data.token)
                Api.setValueToLocalStorage('user', JSON.stringify(res.data.user))
                navigate('/')
            }
            else {
                toast({
                    title: 'Уведомление',
                    description: "Введенные данные неверны",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
    }
    return (
        <>
            <div style={{
                Width: 400,
                margin: '0 auto',
                padding: 20,

            }}>
                <VStack gap={'20px'} >
                    <Input size='md' name='email' type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    <Input name='pwd' type='password' placeholder='password' onChange={(e) => setPwd(e.target.value)} />
                    <Button colorScheme='gray' onClick={() => handleToLogin()}> Авторизоваться </Button>
                    <Text >Еще нет аккаунта? <Link to='/login'><Text color='GrayText'>Зарегистрироваться</Text></Link></Text>
                </VStack>
            </div>

        </>
    );
}