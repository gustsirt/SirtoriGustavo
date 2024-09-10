import React from 'react'
import BackButton from '../components/BackButton'

const Frame = ({ children , redirect, css}) => {
  if (css == undefined) {css = "w-fit"}
  return (
    <div className="relative">
      { redirect ? <BackButton to={ redirect }/> : null}
      <div className="bg-gray-100 min-h-screen py-10">
        <div className={`mx-auto p-8 bg-white shadow-lg rounded-lg overflow-hidden ${css}`}>
          {children }
        </div>
      </div>
    </div>
  )
}

export default Frame