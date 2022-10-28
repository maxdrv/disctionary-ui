import {Link, useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";
import {StyledContainer} from "./styled/Container.styled";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <StyledContainer>
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to={"/phrase"}>Phrases</Link> {" "}
            <br />
            <Link to={"/plan"}>Lesson plans</Link> {" "}
            <br />
            <Link to={"/lesson"}>Lessons</Link> {" "}
            <br />
            <Link to={"/currentLesson"}>Current lesson</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
        </StyledContainer>
    )
}

export default Home