import React, { useEffect } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItemSecondaryAction, ListItem, Divider } from '@material-ui/core'

export default function UnapprovedFiles(){
    const [files, setFiles] = useState([])
    useEffect(() => {
        //Place for get request
    });

    function getFilesFromResponse(res){
        filesRef.current = filesRef.current.concat(res.data);
        setFiles(filesRef.current);
    }

    function viewBtnClicked(){
        //If a video file load the video in the video player
        //If not a video file then download the file for viewing
    }

    function fileListItemClicked(){
        //Bring up dialog that gives the option to approve/disapprove of the file's upload
    }

    return (
        <List>
            {files.map((file) =>
                <>
                    <ListItem onClick={fileListItemClicked} button={true}>
                        <ListItemText />
                        <ListItemSecondaryAction>
                            <Button onClick={viewBtnClicked} variant="contained" color="primary">
                                View
                            </Button>
                        </ListItemSecondaryAction>

                    </ListItem>
                    <Divider />
                </>
            )}
        </List>
    );
}