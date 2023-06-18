import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import Link from 'next/link';
import { Skeleton } from '@mui/material';
const Widget1 = ({ data, title }) => {
    const [story, setStory] = useState();
    useEffect(() => {
        setStory(data.filter(item => item.category.toLowerCase().includes(title.toLowerCase())));
    }, [])
console.log('widget 1')
    console.log(story)
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
                <Link href={`/blog/category/${title.split(' ').join('-')}`} className="flex items-center text-red-500">View all <IoIosArrowRoundForward className='mt-1' /></Link>
            </div>
            {
                story && story.length > 0 &&
                <div className="w-full flex gap-4 flex-col xl:flex-row mt-4">
                    <div className='rounded-lg h-[19rem] w-full xl:w-[45%] border border-gray-200 relative flex items-end'>
                        <img src={story[0]?.cover} className='h-full w-full object-cover rounded-lg absolute top-0' alt="" />
                        <div className="w-full rounded-lg h-[19rem]  absolute top-0 bg-gradient-to-tr from-gray-700 to-transparent"></div>
                        <div className="w-full p-4 z-10 text-white">
                            <Link href={`/blog/category/${story[0].category}`} className="text-sm">{story[0].category[0].toUpperCase() + story[0].category.slice(1).toLowerCase()}</Link>
                            <Link href={`/blog/${story[0].link}`} ><h2 className="font-bold text-xl">{story[0].title.slice(0, 100)}{story[0].title.length > 100 ? ".." : ""}</h2></Link>
                            <span className='text-sm'>{getFormattedDate(story[0].createdAt)}</span>
                        </div>
                    </div>
                    <div className='rounded-lg h-[19rem] w-full xl:w-[55%]  relative flex flex-col gap-4 '>
                        {
                            story.map((story, index) => {
                                if (index == 0 || index >= 5) {
                                    return;
                                }
                                return <div key={index} className="w-full h-16 flex gap-2 justify-start">
                                    <div className='w-24 rounded shrink-0'>
                                        <img src={story.cover} className='w-full h-full object-cover rounded-lg' alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Link href={`/blog/article/${story.link}`} className="font-semibold h-16 overflow-hidden leading-5">{story.title}</Link>
                                        <span className='text-sm'>{getFormattedDate(story.createdAt)}</span>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
            {
                story && story.length<=0 &&
                <div className="w-full flex gap-4 flex-col xl:flex-row mt-4">
                    <BlogCardSkelton />
                    <div className='rounded-lg h-[19rem] w-full xl:w-[55%]  relative flex flex-col gap-4 '>
                        <BlogItemSkelton />
                        <BlogItemSkelton />
                        <BlogItemSkelton />
                        <BlogItemSkelton />
                    </div>
                </div>
            }
        </div>
    )
}

export default Widget1

function BlogCardSkelton() {
    return <div className='rounded-lg h-[19rem] flex-col w-full xl:w-[45%] border border-gray-200 relative flex items-end'>
        <Skeleton
            variant="rectangular"
            animation="wave"
            height="100%"
            width="100%"
            className="absolute top-0 rounded-lg"
        />
        <div className="w-full rounded-lg h-[19rem] absolute top-0 bg-gradient-to-tr from-gray-700 to-transparent"></div>
        <div className="w-full p-4 z-10 text-white">
            <Skeleton
                animation="wave"
                height={20}
                width="80%"
                style={{ marginBottom: '0.5rem' }}
            />
            <Skeleton
                animation="wave"
                height={36}
                width="90%"
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

function BlogItemSkelton() {
    return <div className="w-full h-16 flex gap-2 justify-start">
        <div className='w-24 rounded shrink-0'>
            <Skeleton
                variant="rectangular"
                animation="wave"
                height="100%"
                width="100%"
                className="rounded-lg"
            />
        </div>
        <div className="flex w-full flex-col">
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