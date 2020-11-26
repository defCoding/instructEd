import React, { useState, useEffect } from 'react';
import { useConversations } from './ConversationsProvider';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap'
import { Button, Typography } from '@material-ui/core'

export default function CourseConversations({ setSelectedCourseID }) {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <div>
            <Button varient="flush" onClick={() => setSelectedCourseID(-1)}> 
                {"← Back to Courses"}
            </Button>
            <ListGroup variant="flush" className="overflow-auto flex-grow-1">
                {conversations.map((conversation, index) => {
                    return (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => selectConversationIndex(index)}
                            active={conversation.selected}
                        >
                            {conversation.recipients.map(r => `${r.first_name} ${r.last_name}`).join(', ')}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    )
}
