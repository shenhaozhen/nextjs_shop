"use client"

import {motion, useMotionValue, useMotionTemplate, useAnimate } from "framer-motion"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { createClient } from "@/util/supabase/client"

const items = [
  {name: "Home", href: "/"},
  {name: "About", href: "/about"},
  {name: "Shop", href: "/shop"},
]

const panelItems = [
  {name: "account", href: "/account"},
  {name: "setttings", href: "/settings"},
  {name: "dashboard", href: "/dashboard"},
  {name: "cart", href: "/cart"},

]

const Menu = () => {
  
  const [isHovered, setIsHovered] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [login, setLogin] = useState(false)

  const [scope, animate] = useAnimate()
  
  const supabase = createClient()
  
  const getUser = async() => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setLogin(true)
    }
  }

  useEffect(() => {
      getUser()
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true);
    animate(scope.current, {
      clipPath: "inset(0 0 0 0 round 0%)"
    })
  }

  const handleMouseLeave = () => {
    
    if (!showPanel) {
      setIsHovered(false);
      animate(scope.current, {
        clipPath: "inset(0 45% 65% 45% round 0% 0% 5% 5%)"
      })
    }
  }

  //small issue: "menu" appears before menu gets small
  const handleClosePanel = () => {
    setShowPanel(false);
    setIsHovered(false);
    animate(scope.current, {
      clipPath: "inset(0 45% 65% 45% round 0% 0% 5% 5%)"
    },{delay: 0.5})
  }
  
  const handleLogout = async () => {
    try{
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setLogin(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <motion.div className="w-full h-[10vh] bg-[rgba(0,0,0,0.4)] backdrop-blur-md absolute top-0 text-white  flex flex-row justify-center items-center z-[999]" style={{clipPath: "inset(0 45% 65% 45% round 0% 0% 5% 5%)"}}
     transition={{duration: 0.5}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={scope}>
        
        <span className="absolute top-[0%] left-[calc(50% - 4rem)] font-bold" style={{opacity: isHovered ? 0 : 1}}>Menu</span>
        
         {
          items.map((item, index) => (
            <Link href={item.href} key={index} className="w-[12%] h-full leading-[10vh] text-center font-bold hover:text-cyan-500 ">
              {item.name}
            </Link>
          ))
         }

         <div className="absolute right-[1%] top-[calc(50% - 4rem)] w-[8vh] h-[8vh] rounded-[50%] bg-slate-400"
          onMouseEnter={() => setShowPanel(true)}>
           
         </div>
    </motion.div>
    <div className="absolute right-0 top-[10vh] w-[40vh] h-[50vh] bg-[rgba(0,0,0,0.4)] text-white transition-all duration-[2] flex flex-col justify-center items-center gap-[3vh] z-30" style={{maxHeight: showPanel ? "50vh" : 0}} onMouseLeave={handleClosePanel}>
        {/*<button className="absolute left-0 top-0 bg-white rounded-[50%]" onClick={handleClosePanel}> 
            <Image src="/close.png" width="20" height="20" />
        </button>*/}
        {showPanel &&
          panelItems.map((item, index) => {
              return (<div key={index} className="w-[80%] h-[10%] text-center font-bold leading-[3vh] hover:bg-violet-600 flex flex-row justify-center items-center">
                <Link href={item.href}>
                  {item.name}
                </Link>
              </div>) 
          })
        }
        {!login && showPanel &&
              <div className="w-[80%] h-[10%] text-center font-bold leading-[3vh] hover:bg-violet-600 flex flex-row justify-center items-center">
                <Link href="/signup">
                  sign up
                </Link>
              </div>
        }
        {!login && showPanel &&
              <div className="w-[80%] h-[10%] text-center font-bold leading-[3vh] hover:bg-violet-600 flex flex-row justify-center items-center">
                <Link href="/signin">
                  sign in
                </Link>
              </div>
        }
        {login && showPanel && <button onClick={handleLogout}>Log Out</button>}
    </div>
    </>
  )
}

export default Menu