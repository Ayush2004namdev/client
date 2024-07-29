import { useState } from "react";
import toast from "react-hot-toast";



const useAsyncMutation = (mutation) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    
    const [mutate] = mutation();

    const mutateHandler = async (toastMessage,...args) => {
        setLoading(true);
        console.log(args);
        const toastId = toast.loading(toastMessage || 'Working on it...');
        try{
            const res =await mutate(...args)
            console.log(res);
            if(res?.data?.success){
              toast.success(res?.data?.message || "Success" , {id:toastId})
              setData(res.data);
            }
            else{
              toast.error(res?.error?.data?.message || "An error occurred" , {id:toastId})
            }
          }catch(err){
            console.log(err);
            toast(err.data.message || "An error occurred" , {id:toastId})
          }finally{
            setLoading(false);
        }
    }
    
    return [mutateHandler,loading, data ] 
 
}

export  {useAsyncMutation}