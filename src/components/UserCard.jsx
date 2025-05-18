import React from 'react'

const UserCard = ({user}) => {
   const { firstName, lastName, photoUrl, age, about, gender } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
            src={ user?.photoUrl || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" }
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{age ? age : '' + " " + gender ? gender : ''}</p>
            <p>{about}</p>
            <div className="card-actions justify-center m-5">
                <button className="btn btn-primary">Ignored</button>
                <button className="btn btn-secondary">Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard
