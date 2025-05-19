import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utlis/constants';
import { removeUser } from '../utlis/userSlice';

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handLogout = async() => {
    try {
      await axios.get(BASE_URL + "/logout", { withCredentials:true });
      dispatch(removeUser());
      navigate("/login");
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className="navbar bg-base-300">
        <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl"> DevTinder</Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end mx-5 flex">
              <div className="form-control m-2">Welcome, {user?.firstName}</div>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                      <img
                      alt="User photo"
                      src={user?.photoUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}/>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                      <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                      </Link>
                  </li>
                  <li><Link to="/connections">Connections</Link></li>
                  <li><a onClick={handLogout}>Logout</a></li>
                </ul>
            </div>
          </div>
        )}
    </div>
  )
}

export default NavBar
