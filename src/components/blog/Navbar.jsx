import React, { useState, useEffect } from 'react'
import { AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai'
import { MdOutlineMenuOpen, MdOutlineClose } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import Link from 'next/link'
import { Skeleton } from '@mui/material'
import Cookies from 'js-cookie'
const Navbar = () => {
    const [menuClicked, setMenuClicked] = useState(null);
    const [data, setData] = useState()
    const fetchMenuLink = async () => {
        if (Cookies.get('menuLinks')) {
            setData(JSON.parse(Cookies.get('menuLinks')))
            console.log('setting link from cookie')
        } else {
            const response = await fetch('/api/setting/menulink/fetch');
            let json = await response.json();
            if (json.success) {
                let menuLinkData = json.menuLink
                const combinedMenuLinks = [];

                for (let i = 1; i <= 5; i++) {
                    const menuTitle = menuLinkData[`menuTitle${i}`];
                    const menuLink = menuLinkData[`menuLink${i}`];

                    if (menuTitle && menuLink) {
                        combinedMenuLinks.push({ title: menuTitle, link: menuLink });
                    }
                }
                setData(combinedMenuLinks);
                console.log('setting link from api')
                Cookies.set('menuLinks', JSON.stringify(combinedMenuLinks));
                console.log(Cookies.get('menuLinks'))
            }
        }
    }
    useEffect(() => {
        fetchMenuLink();
    }, [])

    const toggleMobileMenu = () => {
        if (typeof window !== 'undefined') {
            let mobileMenu = document.querySelector('#mobile-menu');
            if (mobileMenu.classList.contains('-right-full')) {
                mobileMenu.classList.remove('-right-full');
                mobileMenu.classList.add('right-0');
            } else {
                mobileMenu.classList.remove('right-0');
                mobileMenu.classList.add('-right-full');
            }
        }
    }
    useEffect(() => {
        document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('text-[#73F8AB]'))
        document.body.style.backgroundColor = "#F8FAFC";
        if (menuClicked !== null) {
            document.querySelector(`#${menuClicked}`).classList.add('text-[#73F8AB]')
        }
    }, [menuClicked])

    return (
        <div className='w-screen  md:px-4 sticky top-0 bg-white z-20'>
            <div className="container m-auto flex justify-between items-center md:px-12 p-4 text-gray-800 text-sm">
                <h1>
                    <Link href="/blog" className="flex items-center font-[Jeko-Bold] relative ">
                        <label className='absolute -right-6 -top-[2px] text-[8px] bg-red-500 text-white p-1 h-3 rounded-t-full rounded-r-full flex items-center'>blog</label>
                        <span className="text-lg font-semibold">{process.env.NEXT_PUBLIC_WEBSITE}</span>
                    </Link>
                </h1>
                <div className=" md:block hidden">
                    <ul className="flex gap-4 items-center">
                        {
                            data && data.length > 0 &&
                            data.map((item, index) => {
                                return <Link key={index} href={item.link} className='cursor-pointer hover:text-red-500 menu-item'>{item.title}</Link>
                            })
                        }
                        {
                            !data &&
                            <>

                                <Skeleton animation="wave" height={20} width={100} />
                                <Skeleton animation="wave" height={20} width={100} />
                                <Skeleton animation="wave" height={20} width={100} />
                                <Skeleton animation="wave" height={20} width={100} />
                            </>
                        }
                    </ul>
                </div>
                <div className='md:block hidden'>
                    <ul className="flex gap-4 items-center">
                        <a href='https://twitter.com/yem_usman' target="_blank" className='flex items-center gap-1 cursor-pointer hover:text-blue-400'><AiOutlineTwitter /> Twitter</a>
                        <a href='https://github.com/aulth' target="_blank" className='flex items-center gap-1 cursor-pointer hover:text-[rgb(222,40,123)]'><AiFillInstagram /> Instargam</a>
                        <a href='mailto:mohdusman.you@gmail.com?subject=Inquiry&body=Hello%2C%0A%0A I have a question about... ' target="_blank" className='flex items-center  cursor-pointer rounded-full border border-red-400 p-1 hover:bg-red-400 hover:text-white text-red-400'><HiOutlineMail /></a>
                    </ul>
                </div>
                <div onClick={toggleMobileMenu} className="md:hidden flex items-center mr-0 p-1  rounded-full border  border-red-500 hover:text-white hover:bg-red-400 text-red-500 duration-100 aspect-square cursor-pointer">
                    <MdOutlineMenuOpen className='' />
                </div>
            </div>
            <div id='mobile-menu' className="h-screen  flex flex-col justify-between w-[250px] fixed top-0 -right-full bg-white drop-shadow-xl z-50 p-4 duration-300">
                <ul className="flex flex-col gap-4 justify-start text-gray-800">
                    <div onClick={toggleMobileMenu} className="w-full flex justify-start">
                        <MdOutlineClose className='text-red-500 cursor-pointer' />
                    </div>
                    {
                        data && data.length > 0 &&
                        data.map((item, index) => {
                            return <Link key={index} href={item.link} className='cursor-pointer hover:text-red-500 menu-item'>{item.title}</Link>
                        })
                    }
                    {
                        !data && <>
                            <Skeleton animation="wave" height={20} width={100} />
                            <Skeleton animation="wave" height={20} width={100} />
                            <Skeleton animation="wave" height={20} width={100} />
                            <Skeleton animation="wave" height={20} width={100} />
                        </>
                    }
                </ul>
                <ul className="flex flex-col gap-4 items-start text-gray-800">
                    <a href='https://twitter.com/yem_usman' target="_blank" className='flex items-center gap-1 cursor-pointer hover:text-red-500'><AiOutlineTwitter /> Twitter</a>
                    <a href='https://instagram.com/yem.usman' target="_blank" className='flex items-center gap-1 cursor-pointer hover:text-red-500'><AiFillInstagram /> Instagram</a>
                </ul>
            </div>
        </div>
    )
}

export default Navbar