import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import {offsetDateTimeToDateTime} from "./util/Util";
import QueryNavLink from "./util/QueryNavLink";

const LessonGridView = ({rootPath}) => {

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [pageOfLessonDto, setPageOfLessonDto] = useState({})

    useEffect(() => {
        axios.get(`${rootPath}/api/v1/lesson`)
            .then(response => {
                console.log(response)
                setPageOfLessonDto(response.data)
            })
            .then(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    return (
        <div>
            <table className={'table-common'}>
                <thead>
                    <tr>
                        <th className={'width-10'}>id</th>
                        <th className={'width-15'}>created at</th>
                        <th className={'width-15'}>updated at</th>
                        <th className={'width-15'}>start at</th>
                        <th className={'width-10'}>status</th>
                        <th className={'width-10'}>parent plan id</th>
                        <th className={'width-25'}>description</th>
                    </tr>
                </thead>
                <tbody>
                {
                    pageOfLessonDto.content ?
                        pageOfLessonDto.content.map(lesson => {
                            return (
                                <tr key={lesson.id}>
                                    <td>
                                        <QueryNavLink
                                            style={({ isActive }) => {
                                                return {
                                                    display: "block",
                                                    margin: "1rem 0",
                                                    color: isActive ? "red" : "",
                                                };
                                            }}
                                            to={`/lesson/${lesson.id}`}
                                        >
                                            {lesson.id}
                                        </QueryNavLink>
                                    </td>
                                    <td>{offsetDateTimeToDateTime(lesson.createdAt)}</td>
                                    <td>{offsetDateTimeToDateTime(lesson.updatedAt)}</td>
                                    <td>{offsetDateTimeToDateTime(lesson.startAt)}</td>
                                    <td>{lesson.status}</td>
                                    <td>{lesson.parentPlanId}</td>
                                    <td>{lesson.description}</td>
                                    <td/>
                                </tr>
                            )
                        }) :
                        null
                }
                </tbody>
            </table>
            {errMsg ? <ErrorMessage msg={errMsg}/> : null}
            <Outlet/>
        </div>
    )
}

export default LessonGridView;