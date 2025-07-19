/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import React, {useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext)

  axios.defaults.withCredentials = true

  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [isEmailSent,setIsEmailSent] = useState(false)
  const [otp,setOtp] = useState('')
  const [isOtpSubmitted,setIsOtpSubmitted] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  

  const inputRefs = React.useRef([])
  

  const handleInput=(e,index)=>{
    const value = e.target.value.replace(/[^0-9]/g, '')
    e.target.value = value
    
    if (value && index < inputRefs.current.length-1){
      inputRefs.current[index+1].focus()
    }
  }

  const handleKeyDown =(e,index)=>{
    if (e.key === 'Backspace' && !e.target.value && index>0){
      inputRefs.current[index-1].focus()
    }
  }

  const handlePaste = (e)=>{
    e.preventDefault()
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, '')
    const pasteArray = paste.split('').slice(0, 6)
    
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value=char 
      }
    })

    if (pasteArray.length > 0 && pasteArray.length < 6) {
      inputRefs.current[pasteArray.length].focus()
    }
  }

  const onSubmitEmail = async(e)=>{
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    try{
      setIsLoading(true)
      console.log('Sending reset OTP request to:', `${backendUrl}/api/auth/send-reset-otp`)
      const {data} = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        {email},
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      console.log('Reset OTP response:', data)
      
      if (data.success) {
        toast.success(data.message)
        setIsEmailSent(true)
      } else {
        toast.error(data.message || 'Failed to send OTP')
      }
    }catch(error){
      console.error('Error sending reset OTP:', error)
      toast.error(error.response?.data?.message || 'Failed to send reset OTP')
    }finally{
      setIsLoading(false)
    }
  }

  const onSubmitOtp = async (e)=>{
    e.preventDefault()
    const otpArray = inputRefs.current.map((e)=>e.value)
    const otpValue = otpArray.join('')

    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setOtp(otpValue)
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async(e)=>{
    e.preventDefault()
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try{
      setIsLoading(true)
      const {data} = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {email,otp,newPassword},
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      if (data.success) {
        toast.success(data.message)
        navigate('/login')
      } else {
        toast.error(data.message || 'Failed to reset password')
      }
    }catch(error){
      console.error('Error resetting password:', error)
      toast.error(error.response?.data?.message || 'Failed to reset password')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={assets.ums_logo} alt="UMS Logo" className="w-24 h-auto" />
        </div>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            {!isEmailSent ? "Enter your email to receive a password reset OTP" :
             !isOtpSubmitted ? "Enter the 6-digit OTP sent to your email" :
             "Enter your new password"}
          </p>
        </div>

        {/* Email Form */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )}

        {/* OTP Form */}
        {isEmailSent && !isOtpSubmitted && (
          <form onSubmit={onSubmitOtp} className="mt-8 space-y-6">
            <div className="flex justify-center space-x-2">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  disabled={isLoading}
                />
              ))}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}

        {/* New Password Form */}
        {isOtpSubmitted && (
          <form onSubmit={onSubmitNewPassword} className="mt-8 space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
