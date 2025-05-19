import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utlis/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestConnections, removeRequestConnections } from '../utlis/requestSlice';

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store)=> store.request);

    const reviewRequest = async(status, _id) => {
        try {
            const review = await axios.post(BASE_URL + "/request/reviw/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequestConnections((_id)));
        } catch(err) {
            console.log(err);
        }
    }; 

    const requestConnections = async() => {
        if(requests) return;
        try {
            const request = await axios.get(BASE_URL + "/user/requests/received" + "", { withCredentials: true });
            dispatch(addRequestConnections((request.data?.data)));
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        requestConnections();
    },[]);

    if(!requests) return;

    if(requests.length === 0) return <h1 className="text-center text-bold text-2xl my-10">No Connection Request Found</h1>;


  return (
    <>
    <div className="text-center my-10">
        <h1 className="text-bold text-5xl">Connection Requests</h1>
        {requests.map((request, index) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
            return (
                    <div
                    key={_id}
                    className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img
                            alt="photo"
                            className="w-20 h-20 rounded-full"
                            src={photoUrl || "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"}
                            />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className="btn btn-secondary mx-2" 
                                onClick={() => reviewRequest("rejected", request._id)}>Reject
                            </button>
                            <button className="btn btn-accent mx-2 my-5"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >Accept</button>
                        </div>
                    </div>
                );
        })}
    </div>
    </>
  )
}

export default Requests
