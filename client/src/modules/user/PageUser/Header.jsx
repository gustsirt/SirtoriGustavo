import React from 'react'

const Header = ({user, itsMyProfile }) => {
  return (
    <div className="bg-insight-blue flex flex-col justify-center items-center p-6">
    <img
      className="w-24 h-24 rounded-full border-4 border-white"
      src={user.photo || "https://via.placeholder.com/100"}
      alt={`${user.full_name}`}
    />
    <h2 className="text-3xl font-semibold text-insight-dark text-center">
      {user.full_name}
    </h2>
  </div>
  )
}

export default Header