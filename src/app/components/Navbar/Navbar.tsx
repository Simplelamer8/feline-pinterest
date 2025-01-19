'use client'
import { NavbarInterface, setActiveTab } from '@/redux/slices/navbarSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Navbar.module.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: {navbarSlice: NavbarInterface}) => state.navbarSlice.activeTab);
  const handleTabClick = (tabNumber: number) => {
    return () => dispatch(setActiveTab(tabNumber));
  }
  
  return (
    <div className={styles.navbar}>
          <button 
            onClick={handleTabClick(1)} 
            className={`p-5 ${activeTab === 1 ? 'bg-[#1E88E5] text-white' : null}`} >
              Все котики
          </button>
          <button 
            onClick={handleTabClick(2)} 
            className={`p-5 ${activeTab === 2 ? 'bg-[#1E88E5] text-white' : null}`}>
              Любимые котики
          </button>
    </div>
  )
}
