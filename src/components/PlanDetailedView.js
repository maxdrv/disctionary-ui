import React, {useEffect, useState, Fragment} from 'react';
import axios from "axios";
import CreatePhraseForm from "./CreatePhraseForm";
import PhraseRowEditable from "./PhraseRowEditable";
import PhraseRowReadOnly from "./PhraseRowReadOnly";

const PlanDetailedView = ({planPath, planId, handleHideClick}) => {

    const currentPlanPath = `${planPath}/${planId}`

    const [editPhraseId, setEditPhraseId] = useState(null)
    const [editPhraseFormData, setEditPhraseFormData] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [change, setChange] = useState(false)
    const [planDetailedView, setPlanDetailedView] = useState({
        id: null,
        createdAt: null,
        updatedAt: null,
        description: null,
        phrases: [],
        tags: []
    })

    useEffect(() => {
        axios.get(currentPlanPath)
            .then(response => {
                console.log(response)
                setPlanDetailedView(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrorMsg(error)
            })
    }, [planId, change])

    /**
     * 2022-09-05T15:18:20.559026+03:00 => 2022-09-05 15:18:20
     */
    const offsetDateTimeToDateTime = (origin) => {
        if (!origin) {
            return ''
        }
        return origin.substring(0, 19).replace('T', ' ');
    }

    const handleEditPhraseClick = (event, phrase) => {
        event.preventDefault()
        setEditPhraseId(phrase.id)
        setEditPhraseFormData({...phrase})
    }

    const handleDeletePhraseClick = (event, phraseId) => {
        event.preventDefault()

        axios.delete(`${currentPlanPath}/phrase/${phraseId}`)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleEditPhraseFormChanged = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setEditPhraseFormData({...editPhraseFormData, [fieldName]: fieldValue})
    };

    const handleCancelPhraseFormClick = (event) => {
        event.preventDefault()
        setEditPhraseId(null)
        setEditPhraseFormData({})
    }

    const handleSubmitEditPhraseForm = (event) => {
        event.preventDefault()

        const updatePhraseRequest = {...editPhraseFormData}

        axios.put(`${currentPlanPath}/phrase/${editPhraseId}`, updatePhraseRequest)
            .then(response => {
                console.log(response.data)
                setChange(prev => !prev)
                setEditPhraseId(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

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
                                <button type='button' onClick={handleHideClick}>Hide</button>
                            </td>
                        </tr> :
                        null
                }
                </tbody>
            </table>
            {errorMsg ? <div>{errorMsg}</div> : null}
            <CreatePhraseForm currentPlanPath={currentPlanPath} setChange={setChange}/>
            <form onSubmit={handleSubmitEditPhraseForm}>
                <table className={'table-common'}>
                    <thead>
                        <tr>
                            <th className={'width-10'}>id</th>
                            <th className={'width-20'}>source</th>
                            <th className={'width-10'}>source lang</th>
                            <th className={'width-20'}>transcription</th>
                            <th className={'width-20'}>target</th>
                            <th className={'width-10'}>target lang</th>
                            <th className={'width-10'}>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        planDetailedView.phrases ?
                            planDetailedView.phrases.map(phrase => {
                                return (
                                    <Fragment key={phrase.id}>
                                        {
                                            editPhraseId === phrase.id ?
                                                <PhraseRowEditable
                                                    editPhraseFormData={editPhraseFormData}
                                                    handleEditPhraseFormChanged={handleEditPhraseFormChanged}
                                                    handleCancelPhraseFormClick={handleCancelPhraseFormClick}
                                                /> :
                                                <PhraseRowReadOnly
                                                    phrase={phrase}
                                                    handleEditPhraseClick={handleEditPhraseClick}
                                                    handleDeletePhraseClick={handleDeletePhraseClick}
                                                />
                                        }
                                    </Fragment>
                                )
                            }) :
                            null
                    }
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default PlanDetailedView;