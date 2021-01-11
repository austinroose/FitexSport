import React, {useState, useEffect} from 'react';
import './Style.css';
import { Upload, Button, notification, Spin, Tag, Avatar } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from "../axios";
import { connect } from 'react-redux';
import { TiLocationArrowOutline } from "react-icons/ti";

function GroupBanner(props) {

    const [imageFile, setImageFile] = useState(null)
    const [canUpload, setCanUpload] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [coachData, setCoachData] = useState(null)

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    const owner = props.isOwner
    console.log('owner', owner)

    const openSuccessfulCreateNotificationWithIcon = (type) => {
      notification[type]({
        message: 'Profiilipilt uuendatud',
        description:
          'Et näha uuendusi, värskendage lehte.',
      });
    };

    const props2 = {
        name: 'file',
        accept: 'image/*',
        multiple: false,
    };

    function handleImageChange(file) {
        setImageFile(file)
        console.log('file', file)
        console.log(file.file.name)
        if (file.file.status !== 'removed') {
            setCanUpload(true)
        } else {
            setCanUpload(false)
        }
    };

    function onHandleUpload() {
        setUploading(true)
        async function uploadFile() {
            let form_data = new FormData();
            form_data.append('image', imageFile.file, imageFile.file.name)
            const groupID = props.data.id
            let url = `/api/group/update/${groupID}`
            const result = await axios.patch(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            console.log('result', result)
            if (result.status === 200) {
                openSuccessfulCreateNotificationWithIcon('success')
            }
            else {
                alert('Pildi uuendamisel esines tõrge. Proovige hiljem uuesti')
            }
            setUploading(false)
            setCanUpload(false)
        }
        uploadFile()

    }

    useEffect(() => {
        console.log('coach', props.data.coach)
        const coachID = props.data.coach
        async function getCoachInfo() {
            const result = await axios.get(`api/profile/${coachID}`)
            setCoachData(result.data)
        }
        getCoachInfo()
    }, [props])

    return(
    <div className='trainingGroupBannerContainer'>
        <div className='trainingGroupBannerImage' style={{backgroundImage: `url(${props.data.image})`,
        backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: 'cover'}}>
        {owner ?
                <div className='groupChangeCoverPhoto'>
                    <Upload {...props2} beforeUpload={() => false} onChange={file => handleImageChange(file)}>
                        <Button icon={<UploadOutlined />} shape='round'>Muuda kaanefotot</Button>
                    </Upload>
                    {canUpload ?
                    <>
                        {uploading ?
                        <Spin indicator={antIcon} />
                        :
                        <Button type='primary' shape='round' style={{marginTop: '5px'}} onClick={onHandleUpload}>
                        Muuda</Button>
                        }
                    </>
                    :
                    <></>
                    }
                </div>
            :
                <></>
            }
        </div>
        <div className='trainingGroupBannerNameAndSportContainer'>
            <div className='bannerTextBox'>
                <div style={{display:'flex', flexDirection: 'row', alignItems:'flex-end'}}>
                    <div className='trainingGroupBannerName'>
                        <span >{props.data.name}</span>
                    </div>
                    <div className='trainingGroupBannerSport'>
                        <Tag style={{borderRadius: '15px', fontSize:'15px'}}>{props.data.sport}</Tag>
                    </div>
                </div>
                <div className='trainingGroupBannerCoachName'>
                    {coachData ?
                        <>
                        <div style={{width:'37px'}}>
                            <Avatar src={coachData.image} size={30}/>
                        </div>
                        <span style={{fontSize: '14px'}}>{coachData.name}</span>
                        </>
                    :
                    <></>
                    }

                </div>
                <div className='trainingGroupBannerLocation'>
                    <div style={{width:'37px'}}>
                        <TiLocationArrowOutline style={{fontSize: '25px'}}/>
                    </div>
                    <span style={{fontSize: '14px'}}>{props.data.location}</span>
                </div>
            </div>
        </div>

    </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(GroupBanner);