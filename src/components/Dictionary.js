import React, {useState, useEffect, Fragment} from 'react';
import axios from "axios";
import CreatePlanForm from "./CreatePlanForm";
import PlanDetailedView from "./PlanDetailedView";

const Dictionary = (props) => {

    const path = `http://localhost:8081/api/v1`
    const planPath = `${path}/plan`

    const [change, setChange] = useState(false)
    const [planDetailedId, setPlanDetailedId] = useState(null)
    const [pageOfPlans, setPageOfPlans] = useState({
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
        content: []
    })

    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        axios.get(planPath)
            .then(response => {
                console.log(response)
                setPageOfPlans(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrorMsg(error)
            })
    }, [change])

    /**
     * 2022-09-05T15:18:20.559026+03:00 => 2022-09-05 15:18:20
     */
    const offsetDateTimeToDateTime = (origin) => {
        if (!origin) {
            return ''
        }
        return origin.substring(0, 19).replace('T', ' ');
    }

    const handleShowClick = (event, planId) => {
        event.preventDefault()
        setPlanDetailedId(planId)
    }

    const handleHideClick = (event) => {
        event.preventDefault()
        setPlanDetailedId(null)
    }

    const handleDeleteClick = (event, planId) => {
        event.preventDefault()

        axios.delete(`${planPath}/${planId}`)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {
                planDetailedId ?
                    <PlanDetailedView
                        planPath={planPath}
                        planId={planDetailedId}
                        handleHideClick={handleHideClick}
                    /> :
                    <h1>Choose lesson plan</h1>
            }
            <CreatePlanForm
                path={planPath}
                setChange={setChange}
                setPlanDetailedId={setPlanDetailedId}
            />
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
                    pageOfPlans.content.length ?
                        pageOfPlans.content.map(plan => {
                            return (
                                <tr key={plan.id}>
                                    <td>{plan.id}</td>
                                    <td>{offsetDateTimeToDateTime(plan.createdAt)}</td>
                                    <td>{offsetDateTimeToDateTime(plan.updatedAt)}</td>
                                    <td>{plan.description}</td>
                                    <td>{plan.tags.map(tag => tag.key).join(',')}</td>
                                    <td>
                                        {
                                            planDetailedId === plan.id ?
                                                <button type='button' onClick={handleHideClick}>Hide</button> :
                                                <Fragment>
                                                    <button type='button'
                                                            onClick={(event) => handleShowClick(event, plan.id)}>Show</button>
                                                    <button type='button'
                                                            onClick={(event) => handleDeleteClick(event, plan.id)}>Delete</button>
                                                </Fragment>
                                        }
                                    </td>
                                </tr>
                            )
                        }) :
                        null
                }
                </tbody>
            </table>
            {errorMsg ? <div>{errorMsg}</div> : null}
        </div>
    )
}

export default Dictionary;