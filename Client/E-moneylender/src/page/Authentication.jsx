import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const Authentication = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [ShowTooltip, setShowTooltip] = useState(false);
    const [, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();


    const Login = async () => {
        event.preventDefault();
        toast('Signing In', {
            icon: '🐱‍👤',
        });
        try {
            const response = await axios.post("https://e-money-lender-back.vercel.app/auth/login", {
                username, password
            });
            const { token, userID } = await response.data;
            if (token) {
                setCookies("access_token", token);
                toast.success('Successful', {
                    style: { backgroundColor: "greenyellow", fontSize: "large" }
                });
                window.localStorage.setItem("userId", userID);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                toast.error(response.data.message, {
                    style: { backgroundColor: "rgba(241, 170, 170,1)", fontWeight: "400" }
                })
            }
        } catch (err) {
            toast.error(err.message)
        }


    }

    return (
        <div className=' pt-20' >
            <Toaster />
            <div className="flex border flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your E-Lender account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                UserName
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                </a> */}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={Login}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="flex p-3">
                        <p className=''>Dont have an account?</p><span className='text-md font-bold' onClick={() => navigate("/auth_register")}>Sign Up</span>
                    </div>
                </div>

            </div>
            <br />
            <div className="tooltip_div">
                <button className='border-2 px-3 py-1 bg-slate-400' onFocus={()=>setShowTooltip(true)}>Tooltip</button>
                <div className="border w-64 px-6 py-4" style={{display:ShowTooltip?"block":"none"}}>
                    <p className='title text-lg text-center'>For Guests</p>
                    Username:Guest_Account <br />
                    Password:123456789
                </div>
            </div>


        </div>
    )
}

export default Authentication