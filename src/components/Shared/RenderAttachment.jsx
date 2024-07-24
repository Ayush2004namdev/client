import React from 'react'
import { transformImage } from '../../lib/features';
import { FileOpen } from '@mui/icons-material';

const RenderAttachment = ({file,url}) => {
  
  switch(file){
    case 'video':
      return <video src={url} controls style={{width:'200px'}} preload='none' />
    
    case 'audio':
        return <audio src={url} controls style={{width:'200px'}} preload='none' />
    
    case 'image':
        return <img src={transformImage(url , 200)} alt={'attachment file'} width='200px' height='150px' /> 
   
    default:
        return <FileOpen />        
  }
}

export default RenderAttachment;