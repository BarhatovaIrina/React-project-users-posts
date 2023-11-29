import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from '../services/Api';
import { HStack, VStack, Text, Card, CardHeader, CardBody } from "@chakra-ui/react";

export default function AccountPage() {
    const param = useParams()
    const { id: userId } = param
    console.log('ddd', userId)
    const [userInfo, setUserInfo] = useState(undefined)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        console.log("userId", userId)
        Api.getUserById(userId).then(res => {
            if (res.status === 200 && res?.data && res.data.ok && Array.isArray(res.data.user)) {
                console.log("userId", res.data.user[0])
                setUserInfo(res.data.user[0])
            }
        })
    }
    // console.log(userInfo)
    // const { user, isLoading: userIsLoaded } = useSelector((state) => state.user)

    return (
        <div className='content'>
            {userInfo && <VStack>
                <VStack>
                    <Text>id: {userInfo.id}, name: {userInfo.name}</Text>
                    <Text> {userInfo.email}</Text>
                    <Text>Count of posts: {userInfo._count.posts}</Text>
                </VStack>

                <HStack>
                    {userInfo.posts.map((item) => (
                        <Card border={"1px"}>
                            <CardHeader>{item.post_title}</CardHeader>
                            <CardBody>{item.post_body}</CardBody>
                        </Card>
                    ))
                    }
                </HStack>

            </VStack>
            }
        </div>
    );
}