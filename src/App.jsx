import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import axiosInstance from "./lib/axios";
import { userExists, userNotExist } from "./redux/slices/userSlice";
import {LayoutLoader} from './components/layout/Loaders'
import { SocketProvider } from "./Socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const App = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)

  useEffect(() => {
    axiosInstance
      .get("/api/v1/user/me")
      .then(({data}) => {dispatch(userExists(data.user)) })
      .catch((err) => {dispatch(userNotExist())});
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<SocketProvider>
          <ProtectedRoutes user={user} />
        </SocketProvider>}>
          <Route path="/" element={<Home />} />
          <Route path="chat/:chatId" element={<Chat />} />
          <Route path="groups" element={<Groups />} />
        </Route>
        <Route
          path="login"
          element={
            <ProtectedRoutes user={!user} redirect="/">
              <Login />
            </ProtectedRoutes>
          }
          />
      </Routes>
      <Toaster position="bottom-center"/>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
