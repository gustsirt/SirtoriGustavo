import React, { useState } from 'react'
import SectionWForm from '../../layout/frame/Section.Form';

const Proyects = () => {
  const [data, setData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.comm'
  })


  return (
    <SectionWForm
      title="HACIENDO SECTION WITH FORM"
      data={data}
      setData={setData}
      isEditable={true}
      >
    </SectionWForm>
  )
}

export default Proyects