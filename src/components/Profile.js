import React, { useState } from 'react'
import Identicon from 'identicon.js';
import Modal from 'react-modal'
import { convertBytes } from './helpers';
import { User, File, Film, Image, Music } from 'react-feather';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#1a1a1a',
    border: 'none',
    borderRadius: '40px',
    padding: '50px 100px'
  },
  overlay: {
    backgroundColor: '#27262ce9'
  }
}

function Profile(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function countFiles() {
        let count = 0
         props.files.forEach((file) => {
            count += parseInt(file.fileSize, 10)
        })
       return (convertBytes(count.toString()))
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <button className="profile-button" onClick={openModal}><User color="white" size={30} /></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Upload"
            >
                <div className="profile">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
                        <div>
                            {props.account
                                ? <img
                                    alt=""
                                    className="profile-image"
                                    width="20"
                                    height="20"
                                    src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
                                />
                                : <span></span>
                            }
                            <a target="_blank"
                            alt=""
                            className="profile-address"
                            rel="noopener noreferrer"
                            href={"https://etherscan.io/address/" + props.account}>
                                {props.account ? props.account.substring(0,10) : '0x0'}...{props.account ? props.account.substring(35,42) : '0x0'}
                            </a>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center'}}>
                            <button className="theme-button brd-rd-left"><Sun /></button>
                            <button className="theme-button brd-rd-right"><Moon /></button>
                        </div> */}
                    </div>
                    <div className="file-container">
                        <div className="file-container-left">
                            <div className="file-list" style={{ marginBottom: '.5rem'}}>
                                <File size={50} strokeWidth={1}/>
                                <div style={{display: 'block', marginLeft: '1rem' }}>
                                    <p>Documents</p>
                                    <p>{props.files.filter(file => file.fileType.substring(0,11) === "application").length}</p>
                                </div>
                            </div>
                            <div className="file-list">
                                <Music size={50} strokeWidth={1}/>
                                <div style={{display: 'block', marginLeft: '1rem' }}>
                                    <p>Audios</p>
                                    <p>{props.files.filter(file => file.fileType.substring(0,5) === "audio").length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="file-container-right">
                            <div className="file-list" style={{ marginBottom: '.5rem'}}>
                                <Image size={50} strokeWidth={1}/>
                                <div style={{display: 'block', marginLeft: '1rem' }}>
                                    <p>Images</p>
                                    <p>{props.files.filter(file => file.fileType.substring(0,5) === "image").length}</p>
                                </div>
                            </div>
                            <div className="file-list">
                                <Film size={50} strokeWidth={1}/>
                                <div style={{display: 'block', marginLeft: '1rem' }}>
                                    <p>Videos</p>
                                    <p>{props.files.filter(file => file.fileType.substring(0,5) === "video").length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: '1rem 0', borderBottom: '1px solid white' }}>
                        <p>Total Files: {props.files.length}</p>
                        <p>Used Space: {countFiles()}</p>
                    </div>
                    <img alt="" src="/assets/Colored-black.svg" style={{ height: '2rem', margin: '.5rem 0' }}/>
                    <small>App version 2.0</small>
                </div>
            </Modal>
        </div>
    )
}

export default Profile
