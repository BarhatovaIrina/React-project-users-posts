import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from '../services/Api';
import { HStack, VStack, Text } from "@chakra-ui/react";

export default function Header() {
    const param = useParams()
    const { id: userId } = param
    const [userInfo, setUserInfo] = useState(undefined)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        Api.getUserById(userId).then(res => {
            if (res.status === 200 && res?.data && res.data.ok && Array.isArray(res.data.user)) {
                setUserInfo(res.data.user[0])
            }
        }

        )
    }

    // const { user, isLoading: userIsLoaded } = useSelector((state) => state.user)

    return (
        <>
            <VStack>
                {userInfo && <HStack>
                    <Text> {userInfo.email}</Text>
                    {/* <Text>Count of posts: {userInfo._count.posts}</Text> */}
                </HStack>}

            </VStack>
        </>
    );
}