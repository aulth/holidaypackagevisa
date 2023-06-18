import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { Skeleton } from '@mui/material'
const Widget2 = ({ data, title }) => {
    const [thoughts, setThoughts] = useState()
    useEffect(() => {
        setThoughts(data.filter(item => item.category.toLowerCase().includes(title.toLowerCase())));
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
        <>
            <style jsx>
                {`
            .you-might-like::-webkit-scrollbar{
                height:0px;
              }
            //   .you-might-like::-webkit-scrollbar-button{
            //     background-color:rgba(6,182,212, 1);
            //     width:5px;
            //   }
              .you-might-like::-webkit-scrollbar-thumb {
                background-color: rgba(6,182,212,0.7);
              }`}
            </style>
            <div className="w-full rounded-lg p-4 ">
                <div className="w-full flex justify-between">
                    <h2 className="font-bold">{title}</h2>
                    <Link href={`/blog/category/${title.toLowerCase()}`} className="flex items-center text-red-500">View all <IoIosArrowRoundForward className='mt-1' /></Link>
                </div>
                <div className="w-full overflow-x-scroll overflow-y-hidden flex gap-4 mt-4 you-might-like ">
                    {
                        thoughts && thoughts.length > 0 &&
                        thoughts.map((thought, index) => {
                            return <div key={index} className='w-64 shrink-0'>
                                <img src={thought.cover} className='w-full aspect-[10/7] object-cover rounded-lg' alt="" />
                                <div className="w-full mt-1">
                                    <Link href={`blog/${thought.link}`}><h2 className="font-bold">{thought.title.slice(0, 57)}{thought.title.length > 57 ? ".." : ""} </h2></Link>
                                    <span className='text-sm'>{getFormattedDate(thought.createdAt)}</span>
                                </div>
                            </div>
                        })
                    }
                    {
                        thoughts && thoughts.length <= 0 &&
                        <>
                            <Skelton1 />
                            <Skelton1 />
                            <Skelton1 />
                            <Skelton1 />
                            <Skelton1 />
                            <Skelton1 />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Widget2
function Skelton1() {
    return <div className='w-64 shrink-0'>
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