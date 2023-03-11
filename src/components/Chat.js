import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import './Chat.css'
import { Button } from 'react-bootstrap'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";

export default function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])


    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket], [])

    return (
        <MDBContainer fluid className="py-5 gradient-custom">
            <MDBRow className="">

                <MDBCol >
                    <MDBTypography listUnStyled className="text-black">
                        <ScrollToBottom>
                            {messageList.map((messageContent) => {
                                if (username === messageContent.author) {
                                    return (

                                        <>
                                            <li className="d-flex justify-content-between mb-4">
                                                <img
                                                    src="https://i.postimg.cc/Z5rp1VhJ/6769264-60111.jpg"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                    width="90"
                                                />
                                                <MDBCard className="mask-custom w-50">
                                                    <MDBCardHeader
                                                        className="d-flex justify-content-between p-3"
                                                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                                    >
                                                        <p className="fw-bold mb-0 text-start">{messageContent.author}</p>
                                                        <p className="text-dark small mb-0 text-end">
                                                            <MDBIcon far icon="clock" /> {messageContent.time}
                                                        </p>
                                                    </MDBCardHeader>
                                                    <MDBCardBody>
                                                        <p className="mb-0">
                                                            {messageContent.message}
                                                        </p>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </li>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <li class="d-flex justify-content-between mb-4">
                                                <MDBCard className="w-50 mask-custom">
                                                    <MDBCardHeader
                                                        className="d-flex justify-content-between p-3"
                                                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                                    >
                                                        <p class="fw-bold mb-0">{messageContent.author}</p>
                                                        <p class="text-dark small mb-0">
                                                            <MDBIcon far icon="clock" /> {messageContent.time}
                                                        </p>
                                                    </MDBCardHeader>
                                                    <MDBCardBody>
                                                        <p className="mb-0">
                                                            {messageContent.message}
                                                        </p>
                                                    </MDBCardBody>
                                                </MDBCard>
                                                <img
                                                    src="https://i.postimg.cc/Z5rp1VhJ/6769264-60111.jpg"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                    width="90"
                                                />
                                            </li>
                                        </>
                                    )
                                }


                            })}
                        </ScrollToBottom>

                        <li className="mb-3">
                            <MDBTextArea
                                className='text-black'
                                label=""
                                id="textAreaExample"
                                value={currentMessage}
                                rows={1}
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value)
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        sendMessage();
                                    }
                                }}

                            />
                        </li>
                        <Button onClick={sendMessage} color="dark" size="lg" rounded className="float-end text-dark">
                            Send
                        </Button>
                    </MDBTypography>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}