import {Link} from "react-router-dom"
import {StyledContainer} from "../styled/Container.styled";

const Missing = () => {
    return (
        <StyledContainer>
            <article style={{padding: "100px"}}>
                <h1>Oops!</h1>
                <p>Page Not Found</p>
                <div className="flexGrow">
                    <Link to="/">Visit Our Homepage</Link>
                </div>
            </article>
        </StyledContainer>
    )
}

export default Missing