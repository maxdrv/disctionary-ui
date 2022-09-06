import React from 'react';

const PhraseRowReadOnly = ({phrase, handleEditPhraseClick, handleDeletePhraseClick}) => {
    return (
        <tr key={phrase.id}>
            <td>{phrase.id}</td>
            <td>{phrase.source}</td>
            <td>{phrase.sourceLang}</td>
            <td>{phrase.transcription}</td>
            <td>{phrase.target}</td>
            <td>{phrase.targetLang}</td>
            <td>
                <button type='button' onClick={(event) => handleEditPhraseClick(event, phrase)}>Edit</button>
                <button type='button' onClick={(event) => handleDeletePhraseClick(event, phrase.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default PhraseRowReadOnly;