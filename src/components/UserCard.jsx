import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utlis/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utlis/feedSlice';

const UserCard = ({user}) => {
   const { _id, firstName, lastName, age, about, gender, photoUrl } = user;

   const dispatch = useDispatch();

   const handleSendRequest = async(status, _id) => {
        try {
            const request = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials: true});
            dispatch(removeUserFromFeed((_id)));
        } catch(err) {
            console.log(err);
        }
   }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
            src={ photoUrl || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" }
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{ age || '' } { gender || ''}</p>
            <p>{about}</p>
            <div className="card-actions justify-center m-5">
                <button className="btn btn-primary" onClick={() => { handleSendRequest("ignored", _id) }}>Ignored</button>
                <button className="btn btn-secondary" onClick={() => { handleSendRequest("interested", _id) }}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard
