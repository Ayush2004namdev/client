import { useContext, useMemo ,createContext} from 'react';
import io from 'socket.io-client'


 const SocketContext = createContext();
 const getSocket = () => useContext(SocketContext);
 const SocketProvider = ({children}) => {
    console.log(import.meta.env.VITE_BASE_URL);
    const socket = useMemo(() => io(`${import.meta.env.VITE_BASE_URL}` , {
        withCredentials:true,
    }),[])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider , getSocket}