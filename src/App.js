import './App.css';
import io from 'socket.io-client'
import './bootstrap.min.css'
import Chat from './components/Chat';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';

const socket = io.connect("https://roomate2.onrender.com")

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }


  return (
    <>
      {!showChat ?
        <MDBContainer className="my-5 text-dark">

          <MDBCard>
            <MDBRow className='g-0'>

              <MDBCol md='6'>
                <MDBCardImage src='https://i.postimg.cc/ZqFw427j/7118857-3394897.jpg' alt="login form" className='rounded-start w-100' />
              </MDBCol>

              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>

                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                    <img src='https://i.postimg.cc/KYXBWtMn/Chat-Letter-Illustration-Logo-Social-Media-2.png' className="logo"></img>
                  </div>

                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Enter your Room</h5>

                  <MDBInput
                    className='text-black'
                    wrapperClass='mb-4'
                    label='Name'
                    id='formControlLg'
                    type='text' size="lg"
                    onChange={(event) => {
                      setUsername(event.target.value)
                    }} />
                  <MDBInput
                    className='text-black'
                    wrapperClass='mb-4'
                    label='Room ID'
                    id='formControlLg'
                    type='text'
                    size="lg"
                    onChange={(event) => {
                      setRoom(event.target.value)
                    }} />

                  <Button onClick={joinRoom} className="mb-4 px-5 text-dark" color='dark' size='lg'>Join A Room</Button>

                </MDBCardBody>
              </MDBCol>

            </MDBRow>
          </MDBCard>

        </MDBContainer>
        :
        <Chat socket={socket} username={username} room={room}></Chat>

      }
    </>
  );
}

export default App;
