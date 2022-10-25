import './App.css';
import {Route, Routes} from "react-router-dom";
import PhraseGridView from "./components/PhraseGridView";
import PlanGridView from "./components/PlanGridView";
import PlanDetailedView from "./components/PlanDetailedView";
import LessonGridView from "./components/LessonGridView";
import LessonDetailedView from "./components/LessonDetailedView";
import CurrentLessonView from "./components/CurrentLessonView";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/auth/Unauthorized";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./components/Home";
import Missing from "./components/auth/Missing";
import Admin from "./components/Admin";

const rootPath = 'http://localhost:8081'

const ROLES = {
    USER: 'USER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
    ANONYMOUS: 'ANONYMOUS'
}

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                {/*public routes*/}
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='linkpage' element={<LinkPage/>}/>
                <Route path='unauthorized' element={<Unauthorized/>}/>

                {/*we want to protect this routes*/}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="phrase" element={<PhraseGridView rootPath={rootPath}/>}/>
                        <Route path="plan">
                            <Route
                                index
                                element={<PlanGridView rootPath={rootPath}/>}
                            />
                            <Route path=":planId" element={<PlanDetailedView rootPath={rootPath}/>}/>
                        </Route>
                        <Route path="lesson">
                            <Route
                                index
                                element={<LessonGridView rootPath={rootPath}/>}
                            />
                            <Route path=":lessonId" element={<LessonDetailedView rootPath={rootPath}/>}/>
                        </Route>
                        <Route path="currentLesson" element={<CurrentLessonView/>}/>
                        <Route
                            path="*"
                            element={
                                <main style={{padding: "1rem"}}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]}/>}>
                        <Route path="admin" element={<Admin/>}/>
                    </Route>
                </Route>
                {/*catch all*/}
                <Route path='*' element={<Missing/>}/>
            </Route>
        </Routes>
    );
}

// <div className="App">
//     <div>
//         <nav style={{
//             borderRight: "solid 1px",
//             borderBottom: "solid 1px",
//             paddingBottom: "1rem"
//         }}>
//             <Link to={"/phrase"}>Phrases</Link> {" "}
//             <Link to={"/plan"}>Lesson plans</Link> {" "}
//             <Link to={"/lesson"}>Lessons</Link> {" "}
//             <Link to={"/currentLesson"}>Current lesson</Link>
//         </nav>
//         <Outlet />
//     </div>
// </div>

export default App;
