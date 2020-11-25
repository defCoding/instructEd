import React, { useContext, useState, useEffect, useCallback } from 'react';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export default function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

    const addMessageToConversation = useCallback(({recipients, text, sender})) {
        setConversations()
    }
    return (
        <div>
            
        </div>
    )
}
