'use client'
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";

export default function Login(){
    const router = useRouter()
    const [isRegister, setIsRegister] = useState(false)
    const [formLogin, setFormLogin] = useState({email: '', password: ''})
    const [formRegister, setFormRegister] = useState({name: '', email: '', password: ''})

    console.log(formLogin)
    const handleLogin = async (e: any) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formLogin)
            })
            if(!res){
                alert('login gagal')
            }
            alert('login berhasil!')
            router.push('/')
        }catch(err){
            return NextResponse.json(err, {status: 500})
        }    
    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formRegister)
            })
            if(!res){
                alert('login gagal')
            }
            alert('Register berhasil!')
            setIsRegister(false)
        }catch(err){
            return NextResponse.json(err, {status: 500})
        }    
    }
    return (
        <div className="md:p-5 m-auto w-full h-screen flex flex-row gap-5 overflow-hidden">
            <div className={`w-full px-4 md:px-0 md:w-1/2 md:rounded-2xl border border-slate-500 flex flex-col overflow-hidden justify-center items-center`}>
                <p className="text-4xl font-bold text-slate-600">Welcome to KiPin</p>
                <p className="text-slate-400 text-xl w-full md:w-100 text-center mt-4">Start your experience with KiPin by signing in or signing up.</p>
                <div className="flex flex-row border-slate-300 border px-1 py-1 gap-1 mt-6 rounded-md">
                    <button onClick={() => setIsRegister(false)} className={`${isRegister ? "bg-slate-200/0 hover:bg-fuchsia-50" : "bg-fuchsia-200"} px-14 md:px-20 py-2 rounded-sm transition-all ease-in-out cursor-pointer`}>Sign In</button>
                    <button onClick={() => setIsRegister(true)} className={`${isRegister ? "bg-fuchsia-200" : "bg-slate-200/0 hover:bg-fuchsia-50"} px-14 md:px-20 py-2 rounded-sm transition-all ease-in-out cursor-pointer`}>Sign Up</button>
                </div>
                {/* Login Form */}
                <form onSubmit={handleLogin} className={`w-full md:w-3/4 mt-10 ${isRegister ? "translate-x-[117%] ease-in-out" : "flex flex-col"} transition-all` }>
                    {/* username Input Field */}
                    <label htmlFor="username" className="font-bold text-md text-fuchsia-600">Email <span className="text-rose-500">*</span></label>
                    <div id="password" className="border-slate-200 border rounded-md px-5 py-2 focus:outline-0 focus-within:border-fuchsia-500 flex gap-2 flex-row justify-center">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="style=linear">
                            <g id="email">
                            <path id="vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path id="vector_2" d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                            </g>
                            </g>
                        </svg>
                        <input className="w-[96%] focus:outline-0 text-black placeholder:text-slate-900" placeholder="Email" required onChange={(e) => setFormLogin({...formLogin, email: e.target.value})}/>
                    </div>
                    {/* password Input Field */}
                    <label htmlFor="username" className="mt-5 font-bold text-md text-fuchsia-600">Password <span className="text-rose-500">*</span></label>
                    <div id="password" className="border-slate-200 border rounded-md px-5 py-2 focus:outline-0 focus-within:border-fuchsia-500 flex gap-2 flex-row justify-center">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z" fill="#1C274C"/>
                            <path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="#1C274C"/>
                            <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="#1C274C"/>
                            <path d="M6 10V8C6 7.65929 6.0284 7.32521 6.08296 7M18 10V8C18 4.68629 15.3137 2 12 2C10.208 2 8.59942 2.78563 7.5 4.03126" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M11 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <input className="w-[96%] focus:outline-0 text-black placeholder:text-slate-900" placeholder="Password" required onChange={(e) => setFormLogin({...formLogin, password: e.target.value})}/>
                    </div>

                    <button type="submit" className="bg-fuchsia-500 rounded-md mt-5 text-white py-2 font-bold text-lg cursor-pointer hover:bg-fuchsia-700 transition-all ease-in-out">Sign In</button>
                </form>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className={`-translate-y-[80%] w-full md:w-3/4 mt-10 ${isRegister ? "flex flex-col" : "-translate-x-[117%] ease-in-out"} transition-all`}>
                    {/* username Input Field */}
                    <label htmlFor="name" className="font-bold text-md text-fuchsia-600">Fullname <span className="text-rose-500">*</span></label>
                    <div id="name" className="border-slate-200 border rounded-md px-5 py-2 focus:outline-0 focus-within:border-fuchsia-500 flex gap-2 flex-row justify-center">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="style=linear">
                            <g id="email">
                            <path id="vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path id="vector_2" d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                            </g>
                            </g>
                        </svg>
                        <input className="w-[96%] focus:outline-0 text-black placeholder:text-slate-900" placeholder="Fullname" required onChange={(e) => setFormRegister({...formRegister, name: e.target.value})}/>
                    </div>
                    {/* Email Input Field */}
                    <label htmlFor="username" className="mt-5 font-bold text-md text-fuchsia-600">Email <span className="text-rose-500">*</span></label>
                    <div id="username" className="border-slate-200 border rounded-md px-5 py-2 focus:outline-0 focus-within:border-fuchsia-500 flex gap-2 flex-row justify-center">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="style=linear">
                            <g id="email">
                            <path id="vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path id="vector_2" d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                            </g>
                            </g>
                        </svg>
                        <input className="w-[96%] focus:outline-0 text-black placeholder:text-slate-900" placeholder="Email" required onChange={(e) => setFormRegister({...formRegister, email: e.target.value})}/>
                    </div>
                    {/* password Input Field */}
                    <label htmlFor="username" className="mt-5 font-bold text-md text-fuchsia-600">Password <span className="text-rose-500">*</span></label>
                    <div id="password" className="border-slate-200 border rounded-md px-5 py-2 focus:outline-0 focus-within:border-fuchsia-500 flex gap-2 flex-row justify-center">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z" fill="#1C274C"/>
                            <path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="#1C274C"/>
                            <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="#1C274C"/>
                            <path d="M6 10V8C6 7.65929 6.0284 7.32521 6.08296 7M18 10V8C18 4.68629 15.3137 2 12 2C10.208 2 8.59942 2.78563 7.5 4.03126" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M11 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <input className="w-[96%] focus:outline-0 text-black placeholder:text-slate-900" placeholder="Password" required onChange={(e) => setFormRegister({...formRegister, password: e.target.value})}/>
                    </div>

                    <button type="submit" className="bg-fuchsia-500 rounded-md mt-5 text-white py-2 font-bold text-lg cursor-pointer hover:bg-fuchsia-700 transition-all ease-in-out">Sign Up</button>
                </form>
            </div>
            <div className={`w-full bg-linear-to-br from-purple-500 via-pink-400 to-yellow-400 md:w-1/2 md:rounded-2xl hidden md:flex`}>

            </div>
        </div>
    )
}