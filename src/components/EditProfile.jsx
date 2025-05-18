import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utlis/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utlis/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    
    const dispatch = useDispatch();

    const saveProfile = async() => {
        try {
            setError("");
            //setShowToast(false);
            const res = await axios.patch(
                BASE_URL + "/profile/edit", 
                {
                    firstName, lastName, age, gender, about, photoUrl
                }, {
                    withCredentials: true
                }
            );
            dispatch(addUser(res.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch(err) {
            setError(err?.response?.data);
            console.log("error==",err);
        }
    }

  return (
    <>
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name:</legend>
                    <input 
                    type="text" 
                    value={firstName}
                    className="input" placeholder="Type here"   
                    onChange={(e) => setFirstName(e.target.value) }
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name:</legend>
                    <input 
                    type="text" 
                    value={lastName}
                    className="input" 
                    placeholder="Type here" 
                    onChange={(e) => setLastName(e.target.value) }
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age:</legend>
                    <input 
                    type="text" 
                    value={age}
                    className="input" 
                    placeholder="Type here" 
                    onChange={(e) => setAge(e.target.value) }
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender:</legend>
                    <input 
                    type="text" 
                    value={gender}
                    className="input" 
                    placeholder="Type here" 
                    onChange={(e) => setGender(e.target.value) }
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">About:</legend>
                    <input 
                    type="text" 
                    value={about}
                    className="input" 
                    placeholder="Type here" 
                    onChange={(e) => setAbout(e.target.value) }
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Photo Url:</legend>
                    <input 
                    type="url" 
                    value={photoUrl}
                    className="input" 
                    placeholder="Type here" 
                    onChange={(e) => setPhotoUrl(e.target.value) }
                    />
                </fieldset>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                </div>
                </div>
            </div>
            </div>
            <UserCard user={{firstName, lastName, age, gender, about, photoUrl}} />
        </div>
        {showToast && (
            <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>
        )}
    </>
  )
}

export default EditProfile
