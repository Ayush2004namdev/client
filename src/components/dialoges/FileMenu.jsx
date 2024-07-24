import { ListItem, ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/slices/misc';
import { AudioFile, Image as ImageIcon, UploadFile, VideoFile } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useSendAttachmentMutation } from '../../redux/api/api';

const FileMenu = ({anchorEl,chatId}) => {
    const dispatch = useDispatch();
    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const fileRef = useRef(null);
    const {isFileMenu} = useSelector(state => state.misc);
    const closeFileMenu = () => {
        dispatch(setIsFileMenu(false));
    }


    const selectImage = () => imageRef.current.click();
    const selectvideo = () => videoRef.current.click();
    const selectaudio = () => audioRef.current.click();
    const selectfile = () => fileRef.current.click();
    const [sendAttachment] = useSendAttachmentMutation();

    const fileChangeHandler = async(e,key) => {
        const files = Array.from(e.target.files)
        if(files.length < 1) return;
        if(files.length > 4) return toast.error('You can only choose upload upto 5 files')
        dispatch(setUploadingLoader(true));
        const toastId = toast.loading(`Sending ${key}...`);
        closeFileMenu();
        try {
            const attachmentForm = new FormData();
            attachmentForm.append('chatId' , chatId);
            files.forEach((file) => attachmentForm.append('files' , file));
            const res = await sendAttachment(attachmentForm)
            console.log(res);
             if(res.data) toast.success(`${key} successfully sent` , {id:toastId})
             else toast.error(`failed to send ${key}`,{id:toastId});
        } catch (error) {
            console.log(error);
            toast.error(error , {id:toastId})
        }finally{
            dispatch(setUploadingLoader(false))
        }
    }
 
  return (
    <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFileMenu} >
        <div style={{width:'10rem'}}>
            <MenuList>
            <MenuItem onClick={selectImage}>
                <Tooltip title='Image'>
                    <ImageIcon/>
                </Tooltip>
                <ListItemText style={{marginLeft:'0.5rem'}}>Image</ListItemText>
                <input type='file'
                accept='image/png, image/jpg, image/jpeg, image/gif'
                ref={imageRef}
                 multiple style={{display:'none'}} onChange={(e) => fileChangeHandler(e,'images')} />
            </MenuItem>

            <MenuItem onClick={selectaudio}>
                <Tooltip title='Audio' >
                    <AudioFile/>
                </Tooltip>
                <ListItemText style={{marginLeft:'0.5rem'}}>Audio</ListItemText>
                <input type='file'
                accept='audio/mpeg, audio/wav'
                multiple
                ref={audioRef}
                 style={{display:'none'}} onChange={(e) => fileChangeHandler(e,'audios')} />
            </MenuItem>

            <MenuItem onClick={selectvideo}>
                <Tooltip title='Video'>
                    <VideoFile/>
                </Tooltip>
                <ListItemText style={{marginLeft:'0.5rem'}}>Video</ListItemText>
                <input type='file'
                ref={videoRef}
                accept='video/mp4, video/webm, video/ogg'
                multiple
                 style={{display:'none'}} onChange={(e) => fileChangeHandler(e,'videos')} />
            </MenuItem>
            
            <MenuItem onClick={selectfile}>
                <Tooltip title='File'>
                    <UploadFile/>
                </Tooltip>
                <ListItemText style={{marginLeft:'0.5rem'}}>File</ListItemText>
                <input type='file'
                ref={fileRef}
                accept='*'
                multiple
                 style={{display:'none'}} onChange={(e) => fileChangeHandler(e,'files')} />
            </MenuItem>

        </MenuList>
        </div>
    </Menu>
  )
}

export default FileMenu