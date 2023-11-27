import { Button, Text, Input, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Api } from '../services/Api';

export default function RegisterPage() {
    const [email, setEmail] = useState(undefined)
    const [pwd, setPwd] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [age, setAge] = useState(undefined)

    const toast = useToast()
    const handleToRegister = () => {
        if (!email || !name || !age || !pwd) {
            toast({
                title: 'Внимание',
                description: "Нужно заполнить обязательные поля",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        Api.registerUser({ email, name, pwd }).then(res => {
            if (res.status === 200 && res?.data) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userData', JSON.stringify(res.data.user))
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
                    <Input name='name' type='text' placeholder='name' onChange={(e) => setName(e.target.value)} />
                    <Input name='pwd' type='password' placeholder='password' onChange={(e) => setPwd(e.target.value)} />
                    <Input name='age' type='text' placeholder='age' onChange={(e) => setAge(e.target.value)} />
                    <Button colorScheme='gray' onClick={() => handleToRegister()}> Зарегистрироваться </Button>
                    <Text >Уже есть аккаунт? <Link to='/login'>Авторизоваться</Link></Text>
                </VStack>
            </div>

        </>
    );
}