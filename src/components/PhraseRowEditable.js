import React from 'react';

const PhraseRowEditable = ({editPhraseFormData, handleEditPhraseFormChanged, handleCancelPhraseFormClick}) => {
    return (
            <tr>
                <td>
                    {editPhraseFormData.id}
                </td>
                <td>
                    <input
                        type='text'
                        required='required'
                        name='source'
                        value={editPhraseFormData.source}
                        onChange={handleEditPhraseFormChanged}
                        placeholder='text in source language'
                    />
                </td>
                <td>
                    <input
                        type='text'
                        required='required'
                        name='sourceLang'
                        value={editPhraseFormData.sourceLang}
                        onChange={handleEditPhraseFormChanged}
                        placeholder='source language'
                    />
                </td>
                <td>
                    <input
                        type='text'
                        required='required'
                        name='transcription'
                        value={editPhraseFormData.transcription}
                        onChange={handleEditPhraseFormChanged}
                        placeholder='transcription'
                    />
                </td>
                <td>
                    <input
                        type='text'
                        required='required'
                        name='target'
                        value={editPhraseFormData.target}
                        onChange={handleEditPhraseFormChanged}
                        placeholder='text in target language'
                    />
                </td>
                <td>
                    <input
                        type='text'
                        required='required'
                        name='targetLang'
                        value={editPhraseFormData.targetLang}
                        onChange={handleEditPhraseFormChanged}
                        placeholder='target language'
                    />
                </td>
                <td>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={handleCancelPhraseFormClick}>Cancel</button>
                </td>
            </tr>
    )
}

export default PhraseRowEditable;