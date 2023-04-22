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
            <div className='form-group mb-3'>
              <label
                htmlFor='username'
                className='col-form-label fs-4'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                autoComplete='off'
                placeholder='Username'
                className='form-control form-control-sm'
                value={credential.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='form-group mb-3'>
              <label
                htmlFor='inputPassword3'
                className='col-form-label fs-4'
              >
                Password
              </label>
              <span> </span>
              <input
                type='password'
                id='password'
                name='password'
                autoComplete='off'
                placeholder='Password'
                className='form-control form-control-sm'
                value={credential.password}
                onChange={handleChange}
              />
            </div>
            <div className='form-group mb-0'>
              <div className='buttons'>
                <button className='btn button-effect btn-primary w-100 px-3 py-2 rounded-1'>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthSignIn
