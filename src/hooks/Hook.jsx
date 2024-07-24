import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrors = (errors =[]) => {
    useEffect(() => {
        errors.map(({isError,error , fallback}) => {
            if(isError){
                if(fallback) fallback();
                else toast.error(error?.data?.message || "An error occurred");
            }
        })
    },[errors])
}


const useSocketEvents = (socket,handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([event , handler]) => {
            socket.on(event , handler);
        })
        return () =>  Object.entries(handlers).forEach(([event , handler]) => {
            socket.on(event , handler);
        })
    },[])
}
export {useErrors , useSocketEvents};

