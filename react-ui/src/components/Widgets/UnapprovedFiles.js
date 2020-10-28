import React, { useEffect } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'

export default function UnapprovedFiles(){
    const [files, setFiles] = useState([])
    useEffect(() => {
        //Place for get request
    });

    function getFilesFromResponse(res){
        filesRef.current = filesRef.current.concat(res.data);
        setFiles(filesRef.current);
    }

    return (
        <List>
            {files.map((file) =>
                <>
                    <ListItem button={true}>

                    </ListItem>
                    <Divider />
                </>
            )}
        </List>
    );
}