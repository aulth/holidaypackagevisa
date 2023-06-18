import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import Link from 'next/link'
import { Skeleton } from '@mui/material'
const Widget3 = ({ data, title }) => {
    const [tips, setTips] = useState()
    useEffect(() => {
        setTips(data.filter(item => item.category.toLowerCase().includes(title.toLowerCase())));
    }, [])
    const getFormattedDate = (str) => {
        const date = new Date(str);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }
    return (
        <div className="w-full rounded-lg p-4">
            <div className="w-full flex justify-between">
                <h2 className="font-bold">{title}</h2>
                <Link  href={`/blog/category/${title.toLowerCase()}`} className="flex items-center text-red-500">View all <IoIosArrowRoundForward className='mt-1' /></Link>
            </div>
            <div className="w-full flex flex-wrap   mt-4">
                {
                    tips && tips.length > 0 && tips.map((tips, index) => {
                        if (index >= 6) {
                            return;
                        }
                        return <div key={index} className='w-1/2 md:w-1/3 p-1'>
                            <img src={tips.cover} className='w-full aspect-[10/7] object-cover rounded-lg' alt="" />
                            <div className="w-full mt-1">
                                <Link href={`/blog/${tips.link}`}><h2 className="font-bold">{tips.title.slice(0, 57)}</h2></Link>
                                <span className='text-sm'>{getFormattedDate(tips.createdAt)}</span>
                            </div>
                        </div>
                    })
                }
                {
                    tips && tips.length<=0 &&
                    <>
                    <Skelton1/>
                    <Skelton1/>
                    <Skelton1/>
                    <Skelton1/>
                    <Skelton1/>
                    <Skelton1/>
                    </>
                }

            </div>
        </div>
    )
}

export default Widget3
function Skelton1() {
    return <div className='w-1/2 md:w-1/3 p-1'>
        <Skeleton
            variant="rectangular"
            animation="wave"
            height={100}
            width="100%"
            aspectRatio={10 / 7}
            className="rounded-lg"
        />
        <div className="w-full mt-2">
            <Skeleton
                animation="wave"
                height={20}
                width="80%"
                style={{ marginBottom: '0.5rem' }}
            />
            <Skeleton
                animation="wave"
                height={16}
                width="40%"
            />
        </div>
    </div>
}