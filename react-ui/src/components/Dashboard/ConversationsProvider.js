import React, { useContext, useState, useEffect, useCallback } from 'react';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export default function ConversationsProvider({ children }) {
    const [ conversations, setConversations ] = useState([]);
    const [ selectedConversationIndex, setSelectedConversationIndex ] = 
    return (
        <div>
            
        </div>
    )
}
