import React from 'react'
import Form from '../../components/shared/form/Form'

const Register = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src="./assets/image/piron-guillaume-U4FyCp3-KzY-unsplash.jpg" alt="image not found" />
        </div>
        <div className="col-md-4 form-container">
          <Form
            formTitle={'Register'}
            submitBtn={'Register'}
            formType={'register'}
          />
        </div>
      </div>
    </>
  )
}

export default Register