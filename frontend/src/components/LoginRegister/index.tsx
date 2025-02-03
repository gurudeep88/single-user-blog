'use client';
import { LoginUserProps, UserProps } from '@/interface/user';
import React from 'react'

const LoginRegister = ({
    isRegister,
    state,
    handleChange,
    handleSubmit
}: {
    isRegister: boolean,
    state: UserProps | LoginUserProps,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}) => {
    const {email, password, loading, error, message, show} = state;
    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const getTitle = () => {
        return isRegister ? 'Sign up' : 'Login';
    } 
    
    const registerLoginTemplate = () => {
      return (
        <form onSubmit={handleSubmit}>
          { isRegister ? <div className="form-group mb-3">
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="form-control py-2"
              placeholder="Type name"
            />
          </div> : null }
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control py-2"
              placeholder="Type email"
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control py-2"
              placeholder="Type password"
            />
          </div>
          <div className="text-center mt-3">
              <button className="btn btn-primary px-4">
                 {getTitle()} 
              </button>
          </div>
        </form>
      );
    }
  return (
    <div className="row">
            <div className="col-md-4 offset-md-4">
                <h2 className="text-center mb-4 mt-4">{getTitle()}</h2>
                {showError()}
                {showLoading()}
                {showMessage()}
                {show && registerLoginTemplate()}
            </div>
         </div>
  )
}

export default LoginRegister