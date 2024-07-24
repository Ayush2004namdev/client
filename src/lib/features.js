const fileFormat = (url='') => {
    const fileExt = url.split('.').pop();
    if(fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg'){
        return 'video';
    }
    if(fileExt === 'mp3' || fileExt === 'wav' || fileExt === 'aac'){
        return 'audio';
    }
    if(fileExt === 'jpeg' || fileExt === 'jpg' || fileExt === 'png' || fileExt === 'gif'){
        return 'image';
    }

    return 'file';
}


const transformImage = (url='' , width=100 ) => {
    const newUrl = url.replace('upload/' , `upload/dpr_auto/w_${width}/`)
    return url;
}


const getOrSaveFromLocalStorage = ({key,val,get}) => {
    console.log(get,val,key);
    if(get){
        return localStorage.getItem(key) ?  JSON.parse(localStorage.getItem(key)) : val;
    }
    else{
        localStorage.setItem(key , JSON.stringify(val))
        return null
    }
}


export {fileFormat,transformImage,getOrSaveFromLocalStorage}