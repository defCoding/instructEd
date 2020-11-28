import React, { useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from './ConversationsProvider';
import moment from 'moment';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations();
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

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
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
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
