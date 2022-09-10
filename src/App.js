import './App.css';
import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <div>
              <nav style={{
                  borderRight: "solid 1px",
                  borderBottom: "solid 1px",
                  paddingBottom: "1rem"
              }}>
                  <Link to={"/phrase"}>Phrases</Link> {" "}
                  <Link to={"/plan"}>Lesson plans</Link> {" "}
                  <Link to={"/lesson"}>Lessons</Link>
              </nav>
              <Outlet />
          </div>
      </div>
  );
}

export default App;
