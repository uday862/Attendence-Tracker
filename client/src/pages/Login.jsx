/* eslint-disable no-unused-vars */
import { use, useContext, useState } from "react"
import { assets } from "../assets/assets"
import { data, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {

    const navigate = useNavigate()

    const {backendUrl,setIsLoggedin,getUserData} = useContext(AppContext)

    const [state,setState]=useState('Sign Up')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitHandle = async(e)=>{
        
        try{
            e.preventDefault()

            axios.defaults.withCredentials = true
            
            if(state === "Sign Up"){
               const {data} =  await axios.post(backendUrl + "/api/auth/register", 
                    {name,email,password}
                )
                
                if (data.success){
                    setIsLoggedin(true)
                    getUserData()
                    navigate("/")
                }else{
                    
                    toast.error(data.message)
                }
            }else{
                
                const {data} =  await axios.post(backendUrl + "/api/auth/login", 
                    {email,password}
                )
                console.log(data)
                if (data.success){
                    setIsLoggedin(true)
                    getUserData()
                    navigate("/")
                }else{
                    console.log("error1")
                    toast.error(data.message)
                }
            }
        }catch(error){
            toast.error(data.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 
                    sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img onClick={()=>navigate("/")} src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"/>
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === "Sign Up"?'Create Account':"Login"}</h2>
        <p className="text-center text-sm mb-6">{state === "Sign Up"?'Create Your Account':"Login to your Account"}</p>

        <form onSubmit={onSubmitHandle}>
            {state==="Sign Up" && (
                <div className='mb-4 flex flex-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                <img src={assets.person_icon} alt=""/>
                <input value={name} onChange={e=>setName(e.target.value)} className="bg-transparent outline-none text-white" type="text" placeholder="Full Name"required/>
            </div>
            )}

            <div className='mb-4 flex flex-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                <img src={assets.mail_icon} alt=""/>
                <input  value={email} onChange={e=>setEmail(e.target.value)}  className="bg-transparent outline-none text-white" type="email" placeholder="Email id"required/>
            </div>

            <div className='mb-4 flex flex-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                <img src={assets.lock_icon} alt=""/>
                <input  value={password} onChange={e=>setPassword(e.target.value)}  className="bg-transparent outline-none text-white" type="password" placeholder="Password"required/>
            </div>

            <p className="mb-4 text-indigo-500 cursor-pointer" onClick={()=>navigate("/reset-password")}>Forgot Password</p>
 
            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>
        </form>

        {state === "Sign Up"? (
            <p className="text-gray-400 text-center text-xs mt-4">Already have an Account?{' '}
            <span className="text-blue-400 cursor-pointer underline" onClick={()=>setState('Login')}>Login here</span>
        </p>
        )
        :(
            <p className="text-gray-400 text-center text-xs mt-4">Dont have an Account?{' '}
            <span className="text-blue-400 cursor-pointer underline"  onClick={()=>setState('Sign Up')}>Sign Up here</span>
        </p>
        )}

        

        

      </div>
    </div>
  )
}

export default Login
