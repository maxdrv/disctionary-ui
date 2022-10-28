import {useEffect, useRef, useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import {StyledContainer} from "./styled/Container.styled";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    // CODE BEFORE USE EFFECT
    const effectRun = useRef(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/v1/admin/user', {signal});
                console.log(response.data);
                isMounted && setUsers(response?.data?.content);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        // Check if useEffect has run the first time
        if (effectRun.current) {
            getUsers();
        }

        return () => {
            isMounted = false;
            controller.abort();
            effectRun.current = true; // update the value of effectRun to true
        }
    }, [])

    return (
        <StyledContainer>
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
            </StyledContainer>
    );
};

export default Users;