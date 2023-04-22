import { useState } from 'react'
import { useChat } from '@/helpers/context/chatContext'

const AuthSignIn = () => {
  const { signIn } = useChat()
  const [credential, setCredential] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredential({ ...credential, [name]: value })
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    signIn(credential.username, credential.password)
  }

  return (
    <div className='login-page2 animat-rate'>
      <div className='login-content-main'>
        <div className='login-content'>
          <form className='form2' onSubmit={handleSignIn}>
            <div className='form-group'>
              <label
                htmlFor='username'
                className='col-form-label'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Username'
                className='form-control'
                value={credential.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='form-group'>
              <label
                htmlFor='inputPassword3'
                className='col-form-label'
              >
                Password
              </label>
              <span> </span>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='form-control'
                value={credential.password}
                onChange={handleChange}
              />
            </div>
            <div className='form-group mb-0'>
              <div className='buttons'>
                <button className='btn button-effect btn-primary'>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="animation-block">
        <div className="bg_circle">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="cross"></div>
        <div className="cross1"></div>
        <div className="cross2"></div>
        <div className="dot"></div>
        <div className="dot1"></div>
        <div className="top-circle"></div>
        <div className="center-circle"></div>
        <div className="bottom-circle1"></div>
        <div className="right-circle"></div>
        <div className="right-circle1"></div>
        <div className="quarterCircle"></div>
        <img
          className="cloud-logo"
          src="../assets/images/login_signup/2.png"
          alt="login logo"
        />
        <img
          className="cloud-logo1"
          src="../assets/images/login_signup/2.png"
          alt="login logo"
        />
        <img
          className="cloud-logo2"
          src="../assets/images/login_signup/2.png"
          alt="login logo"
        />
        <img
          className="cloud-logo3"
          src="../assets/images/login_signup/2.png"
          alt="login logo"
        />
        <img
          className="cloud-logo4"
          src="../assets/images/login_signup/2.png"
          alt="login logo"
        />
        <img
          className="cloud-logo5"
          src="../assets/images/login_signup/2.png"
          alt="login logo"
        />
      </div> */}
    </div>
  )
}

export default AuthSignIn
