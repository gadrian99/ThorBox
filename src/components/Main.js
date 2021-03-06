import React, { useState } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'
import ContentAlert from './ContentAlert';
import Modal from 'react-modal'
import Upload from './Upload';
import Profile from './Profile';
import { Search } from 'react-feather'


import { Film, Image, Music, List, Grid} from 'react-feather';
import { ReactComponent as FileImg } from '../assets/img.svg'
import { ReactComponent as FileApp } from '../assets/app.svg'
import { ReactComponent as FileVid } from '../assets/vid.svg'
import { ReactComponent as FileAud } from '../assets/aud.svg'
import { ReactComponent as FileDoc } from '../assets/doc.svg'

Modal.setAppElement('#root');

const Main = (props) => {
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('')
  const [files, setFiles] = useState(props.files)
  const [searchField, setSearchField] = useState("")
  const [modalIsOpen, setIsOpen] = useState(false)
  const [currentFile, setCurrentFile] = useState({})

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
    },
    overlay: {
      backgroundColor: '#27262cc2'
    }
  }

  function filterFiles(e) {
    switch(e) {
      case "video":
        setFiles(props.files.filter(file => file.fileType.substring(0,5) === "video"))
        setFilter("video")
        break
      case "image":
        setFiles(props.files.filter(file => file.fileType.substring(0,5) === "image"))
        setFilter("image")
        break
      case "audio":
        setFiles(props.files.filter(file => file.fileType.substring(0,5) === "audio"))
        setFilter("audio")
        break
      case '':
        setFiles(props.files)
        setFilter("")
        break
      default:
        setFiles(props.files)
    }
  }

  function renderImage(fileType) {
    switch(fileType) {
      case 'video':
        return <FileVid style={{alignSelf: 'center'}}/>
      case 'audio':
        return <FileAud style={{alignSelf: 'center'}}/>
      case 'application':
        return <FileApp style ={{alignSelf: 'center'}} />
      case 'document':
        return <FileDoc style={{alignSelf: 'center'}} />
      default:
        return <FileImg style={{alignSelf: 'center'}} />
    }
  }

  const filteredFiles = files.filter(
    file => {
    return (
        file
        .fileName
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        file
        .fileDescription
        .toLowerCase()
        .includes(searchField.toLowerCase())
    );
    }
  );

  function handleChange(e) {
    setSearchField(e.target.value)
  }

  function openModal(file) {
    setCurrentFile(file)
    setIsOpen(true)
  }

  function afterOpenModal() {


  }

  function closeModal() {
    setIsOpen(false);
    setCurrentFile({})
  }

  function renderTable() {
    return(
      <div className="table-container">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Single File View"
        >
          <div className="table-modal">
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
              { modalIsOpen && currentFile.fileType.split('/', 1) == "image" ? <img alt="" style={{ height: '15rem', alignSelf: 'center', marginBottom: '1rem' }} src={"https://ipfs.infura.io/ipfs/" + currentFile.fileHash} /> : null }
              </div>

              <small>Name</small>
              <p className="mb-3" style={{ wordWrap: 'normal'}}>{currentFile.fileName}</p>

              <small>Description</small>
              <p className="mb-3">{currentFile.fileDescription}</p>

             <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
               <div>
                <small>Size</small>
                <p className="mb-3">{convertBytes(currentFile.fileSize)}</p>
               </div>
               <div>
                <small>File Id</small>
                <p className="mb-3">{currentFile.fileId}</p>
               </div>
               <div>
                <small>Date</small>
                <p className="mb-3">{moment.unix(currentFile.uploadTime).format('h:mm:ss A M/D/Y')}</p>
               </div>
             </div>

              <small>Uploaded by</small>
              <p className="mb-3">{currentFile.uploader}</p>

              <small>File Hash</small>
              <p className="mb-3">{currentFile.fileHash}</p>

              {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <button download className="download-button" href={"https://ipfs.infura.io/ipfs/" + currentFile.fileHash} target="_blank" >Download</button>
                <button className="share-button">Share</button>
              </div> */}
          </div>
        </Modal>
        <table className="table-sm text-center" style={{ width: '85vw', marginTop: '2rem' }}>
        <thead style={{ 'fontSize': '18px' }}>
          <tr className="bg-dark text-white">
            <th scope="col" style={{ width: '200px',  borderTopLeftRadius: '.5rem'}}>Name</th>
            <th scope="col" style={{ width: '230px'}}>Description</th>
            <th scope="col" style={{ width: '120px'}}>Type</th>
            <th scope="col" style={{ width: '90px'}}>Size</th>
            <th scope="col" style={{ width: '90px', borderTopRightRadius: '.5rem'}}>Date</th>
          </tr>
        </thead>
        { filteredFiles.map((file, key) => {
          return(
            <thead className="text-white" style={{ fontSize: '15px', width: '100%', cursor: 'pointer', height: '75px' }} onClick={() => openModal(file)} key={key}>
              <tr className="table-row">
                <td className="overflow" style={{ maxWidth: '200px'}}>{file.fileName}</td>
                <td className="overflow" style={{ maxWidth: '230px'}}>{file.fileDescription}</td>
                <td className="overflow" style={{ maxWidth: '120px'}}>{file.fileType.split('/', 1)[0]}</td>
                <td className="overflow" style={{ maxWidth: '90px'}}>{convertBytes(file.fileSize)}</td>
                <td className="overflow" style={{ maxWidth: '90px'}}>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
              </tr>
            </thead>
            )
          })}
        </table>
      </div>
    )
  }

  function renderGrid() {
    return(
      <>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Single File View"
          >
            <div className="table-modal">
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
              { modalIsOpen && currentFile.fileType.split('/', 1) == "image" ? <img alt="" style={{ height: '15rem', alignSelf: 'center', marginBottom: '1rem' }} src={"https://ipfs.infura.io/ipfs/" + currentFile.fileHash} /> : null }
              </div>

              <small>Name</small>
              <p className="mb-3" style={{ wordWrap: 'normal'}}>{currentFile.fileName}</p>

              <small>Description</small>
              <p className="mb-3">{currentFile.fileDescription}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>
                <small>Size</small>
                <p className="mb-3">{convertBytes(currentFile.fileSize)}</p>
                </div>
                <div>
                <small>File Id</small>
                <p className="mb-3">{currentFile.fileId}</p>
                </div>
                <div>
                <small>Date</small>
                <p className="mb-3">{moment.unix(currentFile.uploadTime).format('h:mm:ss A M/D/Y')}</p>
                </div>
              </div>

              <small>Uploaded by</small>
              <p className="mb-3">{currentFile.uploader}</p>

              <small>File Hash</small>
              <p className="mb-3">{currentFile.fileHash}</p>

              {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <button download className="download-button" href={"https://ipfs.infura.io/ipfs/" + currentFile.fileHash} target="_blank" >Download</button>
                <button className="share-button">Share</button>
              </div> */}
          </div>
        </Modal>
      <div className="grid-container">
        { filteredFiles.map((file, key) => {
        return(
          <div className="card-container" onClick={() => openModal(file)} key={key}>
            { file.fileType.split('/', 1)[0] === "image"
              ? <img alt="preview" style={{ height: '200px', width: '200px', borderRadius: '1rem'}} src={"https://ipfs.infura.io/ipfs/" + file.fileHash} />
              : <div style={{ height: '200px', width: '200px', display: 'flex', justifyContent:'center', alignContent: 'center' }}>
                  {renderImage(file.fileType.split('/', 1)[0])}
                </div>
            }
            <div style={{ textAlign: 'center', height: '25%', display: 'flex', alignItems: 'center'}}>
              <p className="overflow card-text">{file.fileName.substring(0,20)}...</p>
            </div>
          </div>
        )
        })}
      </div>
      </>
    )
  }

  function renderView() {
    return(
      <>
        {view === 'list' ? renderTable() : renderGrid()}
      </>
    )
  }

  return(
      <>

        <div className="header">
          <img alt="logo" src="/assets/Logo.svg" className="logo"></img>
            <div style={{ width: '100%' }} className="search-bar">
              <Search className="search-icon" />
              <input className="search-input" placeholder="Search..." onChange={handleChange}/>
            </div>
            <div className="header-tools">
                <Upload
                  account={props.account}
                  captureFile={props.captureFile}
                  uploadFile={props.uploadFile}
                  fileName={props.fileName}
                  setStep={props.setStep}
                  currentStep={props.currentStep}
                />
                <Profile account={props.account} files={props.files} />
            </div>
        </div>
        <div className="button-wrapper">
          <div className="button-wrapper-left">
            <button className={view === 'list' && 'active'} onClick={() => setView('list')}><List size={30} strokeWidth={1}/></button>
            <button className={view === 'grid' && 'active'} onClick={() => setView('grid')}><Grid size={30} strokeWidth={1}/></button>
          </div>
          <div className="button-wrapper-right">
            <button type="button" className={filter === '' && 'active'} onClick={() =>filterFiles('')}><List size={30} strokeWidth={1}/></button>
            <button type="button" className={"mt-5" + filter === 'video' && 'active'} onClick={() => filterFiles('video')}><Film size={30} strokeWidth={1}/></button>
            <button type="button" className={filter === 'image' && 'active'} onClick={() => filterFiles('image')}><Image size={30} strokeWidth={1}/></button>
            <button type="submit" className={filter === 'audio' && 'active'} onClick={() => filterFiles('audio')}><Music size={30} strokeWidth={1}/></button>
          </div>
        </div>
        {filteredFiles.length < 1 ? <ContentAlert /> : renderView()}
        </>
  )
}

export default Main