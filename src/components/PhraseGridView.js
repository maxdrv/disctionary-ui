import React, {Fragment, useEffect, useState} from 'react';
import PhraseRowEditable from "./PhraseRowEditable";
import PhraseRowReadOnly from "./PhraseRowReadOnly";
import ErrorMessage from "./ErrorMessage";
import CreatePhraseForm from "./CreatePhraseForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PhraseGridView = ({pathParams, planId}) => {
    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [editPhraseFormData, setEditPhraseFormData] = useState({})
    const [pageOfPhraseDto, setPageOfPhraseDto] = useState({})
    const [editPhraseId, setEditPhraseId] = useState(null)

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const path = pathParams ?
            `/api/v1/phrase?` + pathParams.map(pathParam => `${pathParam.name}=${pathParam.value}`).join('&') :
            `/api/v1/phrase`

        axiosPrivate.get(path)
            .then(response => {
                console.log(response)
                setPageOfPhraseDto(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    const handleSubmitEditPhraseForm = (event) => {
        event.preventDefault()

        const updatePhraseRequest = {...editPhraseFormData}

        axiosPrivate.put(`/api/v1/phrase/${editPhraseId}`, updatePhraseRequest)
            .then(response => {
                console.log(response.data)
                setChange(prev => !prev)
                setEditPhraseId(null)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }

    const handleDeletePhraseClick = (event, phraseId) => {
        event.preventDefault()

        axiosPrivate.delete(`/api/v1/phrase/${phraseId}`)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }

    const handleEditPhraseClick = (event, phrase) => {
        event.preventDefault()
        setEditPhraseId(phrase.id)
        setEditPhraseFormData({...phrase})
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

    return (
        <div>
            <CreatePhraseForm setChange={setChange} planId={planId}/>
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
                        pageOfPhraseDto.content ?
                            pageOfPhraseDto.content.map(phrase => {
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
            {errMsg ? <ErrorMessage msg={errMsg}/> : null}
        </div>
    )
}

export default PhraseGridView;