import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom"



const AuthRegister = () => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState(0)
  const [adhaar, setAdhaar] = useState(0);
  const [panId, setPan] = useState(0);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();


  const CreateUser = async () => {
    event.preventDefault();
    if (password == confirmPassword && password!=="") {
      toast.loading("Creating User",{
        duration:1000
      })
      try {
        const Response = await axios.post(
          "https://e-money-lender-back.vercel.app/auth/register",
          // "http://localhost:3001/auth/register",
           {
          name,
          email,
          phone,
          adhaar,
          panId,
          username,
          interestRate:36,
          totalCapital:0,
          password,
        })
        if (Response.data.status===400) {
          toast(Response.data.message,{
            style:{
              backgroundColor:"rgba(241, 170, 170,1)"
            }
          })
        }else if (Response.data.status===201) {
          toast(Response.data.message,{
            style:{
              backgroundColor:"greenyellow"
            }
          })
          navigate("/auth_login")
        }
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      toast.error('Passwords dont match')
    }
  }

  return (


    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Create Lender Account</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">


              <div className="text-gray-600">
                <p className="font-medium text-lg py-4">Personal Details</p>
                <hr />
                <p className='py-4'>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name </label>(as per Adhaar)
                    <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" onChange={(e) => setMail(e.target.value)} />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="adhaar">Adhaar Number</label>
                    <input type="number" name="adhaar" id="adhaar" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Enter Adhaar Card Number" onChange={(e) => setAdhaar(e.target.value)} />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="panId">PAN Card Number</label>
                    <input type="text" name="panId" id="panId" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Enter PAN card Number" onChange={(e) => setPan(e.target.value)} />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input name="phone" type='number' id="phone" placeholder="Enter Phone Number" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                </div>
              </div>


              <div className="text-gray-600">
                <p className="font-medium text-lg py-4">User Details</p>
                <hr />
                <p className='py-4'>Create user account </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" id="username" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setUserName(e.target.value)} />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="text" name="confirmPassword" id="confirmPassword" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Enter the password again" onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={CreateUser}>Submit</button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default AuthRegister