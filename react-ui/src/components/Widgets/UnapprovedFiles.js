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

    function viewBtnClicked(){}

    function fileListItemClicked(){}

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