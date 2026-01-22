"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, User, Wrench, FolderGit, Mail } from "lucide-react"
import { clsx } from "clsx"
import "./Navbar.css"

const items = [
    { name: "Início", url: "#hero", icon: Home },
    { name: "Sobre", url: "#about", icon: User },
    { name: "Habilidades", url: "#skills", icon: Wrench },
    { name: "Projetos", url: "#projects", icon: FolderGit },
    { name: "Contato", url: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={clsx(
        "navbar-container",
      )}
    >
      <div className="navbar-content">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={clsx(
                "navbar-item",
                isActive && "active",
              )}
            >
              <span className="navbar-item-name">{item.name}</span>
              <span className="navbar-item-icon">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="navbar-lamp"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="lamp-top">
                    <div className="lamp-blur-1" />
                    <div className="lamp-blur-2" />
                    <div className="lamp-blur-3" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}