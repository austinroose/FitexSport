import React from 'react';
import {Typography} from 'antd'
import './Style.css'

const {Title, Paragraph} = Typography

function DataDeletionInstructions() {
    return (
        <div className='privacyPolicyPage'>
            <Title>Instructions to delete Your data from Fitex</Title>
                <Paragraph>
                    User's data can be deleted from Fitex Web Environment through clicking button that can be found under
                    User's profile page. Processing the deletion request may take up to 24 hours. User will not be able
                    to log into Fitex again after account has been removed.
                </Paragraph>
        </div>
    )
}
export default DataDeletionInstructions;