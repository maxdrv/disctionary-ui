import React, {useEffect, useState} from 'react';
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import {offsetDateTimeToDateTime} from "./util/Util";
import CreatePlanFormV2 from "./CreatePlanForm";
import QueryNavLink from "./util/QueryNavLink";
import {Outlet} from "react-router-dom";

const PlanGridView = ({rootPath}) => {

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [pageOfPlanDto, setPageOfPlanDto] = useState({
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
        content: []
    })

    useEffect(() => {
        axios.get(`${rootPath}/api/v1/plan`)
            .then(response => {
                console.log(response)
                setPageOfPlanDto(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    const handleDeleteClick = (event, planId) => {
        event.preventDefault()

        axios.delete(`${rootPath}/api/v1/plan/${planId}`)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function handleStartLessonClick(event, planId) {
        event.preventDefault()

        axios.post(`${rootPath}/api/v1/plan/${planId}/startLesson`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <CreatePlanFormV2 rootPath={rootPath} setChange={setChange}/>
            <table className={'table-common'}>
                <thead>
                <tr>
                    <th className={'width-10'}>id</th>
                    <th className={'width-15'}>created at</th>
                    <th className={'width-15'}>updated at</th>
                    <th className={'width-30'}>description</th>
                    <th className={'width-20'}>tags</th>
                    <th className={'width-10'}>actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    pageOfPlanDto.content.length ?
                        pageOfPlanDto.content.map(plan => {
                            return (
                                <tr key={plan.id}>
                                    <td>
                                        <QueryNavLink
                                            style={({ isActive }) => {
                                                return {
                                                    display: "block",
                                                    margin: "1rem 0",
                                                    color: isActive ? "red" : "",
                                                };
                                            }}
                                            to={`/plan/${plan.id}`}
                                        >
                                            {plan.id}
                                        </QueryNavLink>
                                    </td>
                                    <td>{offsetDateTimeToDateTime(plan.createdAt)}</td>
                                    <td>{offsetDateTimeToDateTime(plan.updatedAt)}</td>
                                    <td>{plan.description}</td>
                                    <td>{plan.tags.map(tag => tag.key).join(',')}</td>
                                    <td>
                                        <button type='button' onClick={(event) => handleStartLessonClick(event, plan.id)}>Start</button>
                                        <button type='button' onClick={(event) => handleDeleteClick(event, plan.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }) :
                        null
                }
                </tbody>
            </table>
            {errMsg ? <ErrorMessage/> : null}
            <Outlet />
        </div>
    )
}

export default PlanGridView;