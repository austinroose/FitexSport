import React, {useEffect, useState} from 'react';
import {Typography} from 'antd';

const { Paragraph, Text } = Typography;

function DescriptionFormatter(props) {
    
    // format training description so that for every enter there is new blank line

    const [description, setDescription] = useState(null)
    
    useEffect(() => {
        formatDescription(props.description)
    }, [props])

    function formatDescription(text) {
        console.log('Saadud tekst', text)
        const spl = text.split(/\r?\n/)
        console.log(spl, 'split')
        const split_description = spl.map((section) => 
            <div><Paragraph>{section}</Paragraph></div>
        );
        setDescription(split_description)
    }

    return (
        <div style={{paddingBottom: "20px"}}>
            {description}
        </div>
    )
}

export default DescriptionFormatter;