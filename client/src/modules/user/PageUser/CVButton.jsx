const CVButton = ({action, text}) => {
  return (
    <div>
      <button onClick={action} className='my-2 py-2 px-4 bg-primary text-white rounded-full shadow-md hover:bg-gray-800 transition duration-300 flex items-center print:hidden'>
        {text}
      </button>
    </div>
  )
}

export default CVButton
