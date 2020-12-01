import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from './ConversationsProvider';
import { useSocket } from './SocketProvider';
import moment from 'moment';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(undefined);
    const { sendMessage, selectedConversation, user } = useConversations();
    const convoRef = useRef(selectedConversation);
    const socket = useSocket();

    useEffect(() => {
        convoRef.current = selectedConversation;
    }, [selectedConversation]);

    useEffect(() => {
        if (socket == null) return;
        socket.on('user-typing', data => {
            setTypingUsers(prevTypingUsers => {
                if (convoRef.current && convoRef.current.conversationID == data.conversationID) {
                    if (prevTypingUsers.includes(data.name)) {
                        return prevTypingUsers;
                    } else {
                        return [data.name, ...prevTypingUsers];
                    }
                }
                return prevTypingUsers;
            });
        });

        socket.on('user-stopped-typing', data => {
            setTypingUsers(prevTypingUsers => {
                const idx = prevTypingUsers.indexOf(data.name);
                prevTypingUsers.splice(idx, 1);
                if (prevTypingUsers.length == 0) { 
                    return [];
                }
                return prevTypingUsers;
            });
        });

        return () => {
            socket.off('user-typing');
            socket.off('user-stopped-typing');
        }
    }, [socket]);


    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    function typingTimeoutFunction(recipients) {
        socket.emit('typing', { first_name: user.first_name, last_name: user.last_name,
            recipients, typing: false});
    }

    function startTyping() {
        if (selectedConversation) {
            socket.emit('typing', { first_name: user.first_name, last_name: user.last_name,
                recipients: selectedConversation.recipients, conversationID: selectedConversation.conversationID, typing: true });
            clearTimeout(typingTimeout);
            setTypingTimeout(setTimeout(() => typingTimeoutFunction(selectedConversation.recipients), 1000));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (selectedConversation) {
            sendMessage(
                selectedConversation.recipients,
                text,
                selectedConversation.conversationID
            );

            setText('');
        }
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation ? selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        const diff = moment.utc().diff(moment.utc(moment(message.send_date).format('YYYY-MM-DD HH:mm:ss')));
                        const duration = moment.duration(diff).humanize();
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.message}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {`${message.fromMe ? 'You' : message.senderName} ${duration} ago`}
                                </div>
                            </div>
                        )
                    }) :
                    ''}
                </div>
            </div>
            <div>
                {typingUsers.length > 0 ? typingUsers.join(', ') + ' is typing...' : ''}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => {
                                startTyping();
                                setText(e.target.value)
                            }}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
