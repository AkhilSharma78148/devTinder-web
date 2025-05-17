import React from 'react'
import NavBar from './NavBar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utlis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utlis/userSlice'
import { useEffect } from 'react'

const Body = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if(userData) return;

      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch(err) {
      if(err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body
