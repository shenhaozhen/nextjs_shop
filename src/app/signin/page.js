"use client"
import {useState, useEffect} from 'react'
import Link from 'next/link';
import { login } from './action';

export  default function Signin() {

    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    /*const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         const res =  await fetch('http://localhost:3000/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            if (res.status === 201) {
                alert('Sign in successful');
            }
            if (res.status === 500) {
                alert('Failed to sign in');
            }
        } catch (error) {
            console.log(error);
        }
        setEmail('');
        setPassword('');
        e.target.reset();
    }*/

    return (
        <div className="w-full h-full flex flex-col items-center justify-center min-h-screen py-2"
             style={{background: "url(/acg2.jpeg)", backgroundSize: "cover"}}>
             <div className = "w-[30%] min-h-[70vh] bg-[rgba(0,0,0,0.2)] backdrop-blur-md rounded-md flex flex-col justify-center items-center gap-[5vh]"
                  style={{boxShadow: "0 0 15px 3px rgb(0,0,0)"}}>
                <h1 className='text-[2.5rem] text-white font-bold'> Sign In</h1>
                
                <form className="w-full flex flex-col gap-[3vh] justify-center items-center">
                    <input className="w-[90%] h-[5vh] px-[1rem]" type="email"  name="email" id="email" placeholder="Email" required/>
                    <input className="w-[90%] h-[5vh] px-[1rem]" type={visible ? "text" : "password"} minLength={6}  name="password" id="password" placeholder="Password" required/>
                    <div className="w-[90%] flex flex-row justify-end items-center">
                        <input type="checkbox" id="pwd_show" name="pwd_show" className="w-[2vh] h-[2vh]" onChange={() => setVisible(!visible)}/> 
                        <label htmlFor="pwd_show">Show Password</label>
                    </div>
                    <input type="submit" value="Sign In" className="w-[60%] h-[6vh] bg-emerald-400 rounded-xl hover:bg-indigo-500 hover:text-white" formAction={login}/>
                </form>
                
                <Link href='/signup' className="hover:underline">No account? Create one.</Link>
             </div> 
        </div>
    );
}