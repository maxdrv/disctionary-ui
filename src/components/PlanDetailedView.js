import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {offsetDateTimeToDateTime} from "./util/Util";
import PhraseGridView from "./PhraseGridView";
import ErrorMessage from "./ErrorMessage";

const PlanDetailedView = ({rootPath}) => {
    const params = useParams()
    const planId = params.planId

    const [errMsg, setErrMsg] = useState('')
    const [change, setChange] = useState(false)
    const [planDetailedView, setPlanDetailedView] = useState({
        id: null,
        createdAt: null,
        updatedAt: null,
        description: null,
        tags: []
    })

    useEffect(() => {
        axios.get(`${rootPath}/api/v1/plan/${planId}`)
            .then(response => {
                console.log(response)
                setPlanDetailedView(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    return (
        <div>
            <h1>Lesson plan {planId} showed</h1>
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
                    planDetailedView.id ?
                        <tr>
                            <td>{planDetailedView.id}</td>
                            <td>{offsetDateTimeToDateTime(planDetailedView.createdAt)}</td>
                            <td>{offsetDateTimeToDateTime(planDetailedView.updatedAt)}</td>
                            <td>{planDetailedView.description}</td>
                            <td>{planDetailedView.tags.map(tag => tag.key).join(',')}</td>
                            <td>

                            </td>
                        </tr> :
                        null
                }
                </tbody>
            </table>
            <PhraseGridView rootPath={rootPath} pathParams={[{name: 'planId', value: planId}]} planId={planId}/>
            {errMsg ? <ErrorMessage msg={errMsg}/> : null}
        </div>
    );
}

export default PlanDetailedView;