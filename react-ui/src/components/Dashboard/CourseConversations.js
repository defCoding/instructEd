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
                            {
                                // This part is really ugly, but honestly I do not want to try to restructure the architecture of everything. 
                                // May the lord forgive me for my sins.
                                conversation.recipients.length !== 1 ?
                                "Course Chat" :
                                conversation.recipients[0].online ? <><b style={{ color: 'green' }}>•</b> {conversation.recipients[0].name}</>
                                :
                                <>{conversation.recipients[0].name}</>
                            }
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    )
}
