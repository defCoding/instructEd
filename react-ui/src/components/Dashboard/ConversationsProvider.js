import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';
import axios from 'axios';
import moment from 'moment';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export default function ConversationsProvider({ user, courseID, children }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const socket = useSocket();

    useEffect(() => {
        async function getConversations() {
            if (courseID != -1) {
                try {
                    let res = await axios.get(`/chat/conversations/${courseID}`)
                    let c = res.data;
                    console.log(c);

                    res = await axios.get(`/courses/${courseID}/people`);
                    let people = res.data;
                    if (people.length > c.length) {
                        people = people.filter(p => p.id != user.id);

                        const recipients = people.map(p => p.id);
                        const oldRecipients = c.flatMap(convo => convo.recipients.map(p => p.id));
                        for (const recipient of recipients) {
                            if (!oldRecipients.includes(recipient)) {
                                await axios.post('chat/conversations', { recipients: [recipient, user.id], courseID });
                            }
                        }

                        res = await axios.get(`/chat/conversations/${courseID}`)
                        c = res.data;
                    }

                    // Set online status
                    c = await Promise.all(c.map(async conversation => {
                        let recipients = await Promise.all(conversation.recipients.map(async r => {
                            try {
                                res = await axios.get(`/online_users/${r.id}`); 
                                console.log(res.data);
                                return {...r, online: res.data};
                            } catch (err) {
                                console.log(err);
                                return {...r, online: false};
                            }
                        }));

                        conversation.recipients = recipients;
                        return conversation;
                    }));

                    c = await Promise.all(c.map(async conversation => {
                        try {
                            res = await axios.get(`/chat/messages/${conversation.conversationID}`)
                            return {...conversation, messages: res.data}
                        } catch (err) {
                            console.log(err);
                        }
                    }));
                    console.log(c);
                    setConversations(c);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        getConversations();
    }, [courseID, refresh])

    const addMessageToConversation = useCallback(({ recipients, message, send_date, sender, conversationID, first_name, last_name }) => {
        setConversations(prevConversations => {
            const newMessage = { sender, message, send_date, first_name, last_name }
            const newConversations = prevConversations.map(conversation => {
                if (conversation.conversationID === conversationID) {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            return newConversations
        });

    }, [setConversations]);

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessageToConversation);
        socket.on('user-connection', () => {
            setRefresh(old => 1 - old)
        });

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])


    function sendMessage(recipients, message, conversationID) {
        let send_date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        axios.post('/chat/messages', {
            conversationID,
            message,
            sender: user.id,
            send_date,
        }).catch(err => {
            console.log(err);
        });

        let data = {
            recipients,
            message,
            sender: user.id,
            send_date,
            conversationID,
            first_name: user.first_name,
            last_name: user.last_name
        }
        socket.emit('send-message', data);
        addMessageToConversation(data);
    }

    const formattedConversations = conversations.length != 0 ? conversations.map((conversation, index) => {
        let recipients = conversation.recipients.filter(recipient => recipient.id != user.id);
        recipients = recipients.map(recipient => {
            const name = `${recipient.first_name} ${recipient.last_name}`;
            return { id: recipient.id, name, online: recipient.online };
        });


        const messages = conversation.messages.map(message => {
            const name = `${message.first_name} ${message.last_name}`;
            const fromMe = user.id === message.sender
            return { ...message, senderName: name, fromMe }
        });

        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    }) : conversations;

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        user
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    });
}