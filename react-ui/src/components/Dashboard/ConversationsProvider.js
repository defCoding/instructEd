import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export default function ConversationsProvider({ id, courseID, children }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

    useEffect(() => {
        async function getConversations() {
            if (courseID != -1) {
                try {
                    let res = await axios.get(`/chat/conversations/${courseID}`)
                    let c = res.data;
                    console.log(c);
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
    }, [courseID])

    const addMessageToConversation = useCallback(({ recipients, text, timestamp, sender }) => {
        setConversations(prevConversations => {
            const newMessage = { sender, text, timestamp }
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
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

    function sendMessage(recipients, text) {
        let timestamp = moment().local();
        addMessageToConversation({ recipients, text, timestamp, sender: id })
    }

    function createConversation() {

    }

    const formattedConversations = conversations.messages ? conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const name = `${recipient.first_name} ${recipient.last_name}`;
            return { id: recipient.user_id, name };
        })

        const messages = conversation.messages.map(message => {
            const name = `${messages.first_name} ${messages.last_name}`;
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    }) : conversations;

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
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