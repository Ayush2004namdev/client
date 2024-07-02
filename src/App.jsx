import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import Login from "./pages/Login";
import Groups from "./pages/Groups";
import Chat from "./pages/Chat";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./lib/axios";
import { userExists, userNotExist } from "./redux/slices/userSlice";
import toast, { Toaster } from "react-hot-toast";


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
      <Routes>
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="chat/:id" element={<Chat />} />
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
    </BrowserRouter>
  );
};

export default App;
