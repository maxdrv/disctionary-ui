import React, {useEffect, useState, Fragment} from 'react';
import axios from "axios";
import PhraseRowEditable from "./PhraseRowEditable";
import PhraseRowReadOnly from "./PhraseRowReadOnly";
import ErrorMessage from "./ErrorMessage";
import CreatePhraseFormV2 from "./CreatePhraseForm";

const PhraseGridView = ({rootPath, pathParams}) => {

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [editPhraseFormData, setEditPhraseFormData] = useState(null)
    const [pageOfPhraseDto, setPageOfPhraseDto] = useState({})
    const [editPhraseId, setEditPhraseId] = useState(null)

    useEffect(() => {
        const path = pathParams ?
            `${rootPath}/api/v1/phrase?` + pathParams.map(pathParam => `${pathParam.name}=${pathParam.value}`).join('&') :
            `${rootPath}/api/v1/phrase`

        axios.get(path)
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

        axios.put(`${rootPath}/api/v1/phrase/${editPhraseId}`, updatePhraseRequest)
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

        axios.delete(`${rootPath}/api/v1/phrase/${phraseId}`)
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
            <CreatePhraseFormV2 rootPath={rootPath} setChange={setChange}/>
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