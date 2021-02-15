import React, { useEffect} from 'react'
import {Button} from 'antd'

function helloButton(props) {
    console.log('mina')
    return (<div style={{backgroundColor: "red"}}>
        <span>Mina</span>
        <Button />
    </div>)
}

export default helloButton;
