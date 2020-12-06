import React, { useState, useEffect } from 'react'
import ChatCourses from './ChatCourses';
import CourseConversations from './CourseConversations';

export default function ChatSidebar({setSelectedCourseID, selectedCourseID}) {
    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
          <div className="border-right overflow-auto flex-grow-1 d-flex flex-column">
            {selectedCourseID == -1 ? <ChatCourses setSelectedCourseID={setSelectedCourseID}/> : <CourseConversations setSelectedCourseID={setSelectedCourseID} />}
          </div>
        </div>
    )
}
