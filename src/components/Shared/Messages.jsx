import { Avatar, Box, Stack, Typography } from '@mui/material'
import moment from 'moment/moment';
import React from 'react'
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import { FileOpen } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Messages = ({message }) => {
    const {user} = useSelector(state => state.user);
    const {sender , content,attachments} = message;
    const sameSender = sender?._id === user?._id;
    return (
            <div style={{
                alignSelf:sameSender ? 'flex-end' : 'flex-start',
                color:'black',
                backgroundColor:'white',
                borderRadius:'5px',
                padding:'0.5rem',
                width:'fit-content',
                maxWidth:'80%',
            }}>
                {!sameSender && (
                        <Typography color={'#50B498'} variant={'caption'}>{sender?.name}</Typography>
                )}

                {content && (
                    <Typography>{content}</Typography>
                )}

                {/* attachment component */}

                {attachments?.length > 0 && attachments.map((attach , index) => {
                    const {url , public_id} = attach; 
                    const file = fileFormat(url);
                    return (
                        <Box key={index}>
                            <a href={url} target='_blank' download style={{
                                color:'black',
                            }}>
                                <RenderAttachment file={file} url={url} />
                            </a>
                        </Box>
                    )
                })}
                <div style={{
                    width:'100%',
                    textAlign:'end'
                }}>
                    <Typography variant={'caption'}>{moment(message.createdAt).fromNow()}</Typography>
                </div>
            </div>
    );  
}

export default Messages