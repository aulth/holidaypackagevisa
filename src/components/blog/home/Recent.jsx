import React, { useEffect } from 'react'
import Link from 'next/link';
import { Skeleton } from '@mui/material';
const Recent = ({ data }) => {
    const getFormattedDate = (str) => {
        const date = new Date(str);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }

    return (
        <div className="container m-auto flex gap-4 flex-col  xl:flex-row justify-center  xl:px-16 px-4 py-4">
            {
                data && data.length > 0 &&
                <>
                    <div className="w-full  xl:w-[55%] rounded-lg border border-gray-300 h-60  xl:h-72 relative flex items-end">
                        <img src={data[0].cover} className='h-full w-full object-cover rounded-lg absolute top-0' alt="" />
                        <div className="w-full rounded-lg h-60  xl:h-72 absolute top-0  bg-gradient-to-tr from-gray-700 to-transparent"></div>
                        <div className="w-full p-4 z-10 text-white">
                            <Link href={`/blog/category/${data[0].category}`} className="text-sm">{data[0]?.category[0].toUpperCase() + data[0]?.category.slice(1).toLowerCase()}</Link>
                            <Link href={`/blog/${data[0].link}`} ><h2 className="font-bold text-xl">{data[0]?.title.slice(0, 121)} {data[0].title.length > 121 ? ".." : ""}</h2></Link>
                            <span className='text-sm'>{getFormattedDate(data[0]?.createdAt)}</span>
                        </div>
                    </div>
                    <div className="w-full xl:w-[45%]   xl:h-72 flex gap-4">
                        {
                            data[1] &&
                            <div className="w-1/2 rounded-lg border border-gray-300 h-auto   xl:h-72 relative">
                                <img src={data[1]?.cover} className='h-36 xl:h-[11rem] w-full object-cover rounded-t-lg ' alt="" />
                                <div className="p-2 ">
                                    <Link href={`/blog/${data[1]?.link}`} ><h2 className="font-bold ">{data[1]?.title.slice(0, 68)} {data[1]?.title.length > 68 ? ".." : ""}</h2></Link>
                                    <span className='text-sm'>{getFormattedDate(data[1]?.createdAt)}</span>
                                </div>
                            </div>
                        }
                        {
                            !data[1] &&
                            <div className="w-1/2 rounded-lg border border-gray-300 h-auto xl:h-72 relative">
                                <Skeleton animation="wave" variant="rectangular" height={200} xlHeight={176} className="rounded-t-lg" />
                                <div className="p-2">
                                    <Skeleton animation="wave" height={40} />
                                    <Skeleton animation="wave" height={20} width="80%" />
                                </div>
                            </div>
                        }
                        {
                            data[2] &&
                            <div className="w-1/2 rounded-lg border border-gray-300 h-auto  xl:h-72 relative">
                                <img src={data[2]?.cover} className='h-36 xl:h-[11rem] w-full object-cover rounded-t-lg' alt="" />
                                <div className="p-2">
                                    <Link href={`/blog/${data[2]?.link}`} ><h2 className="font-bold ">{data[2]?.title.slice(0, 68)} {data[2]?.title.length > 68 ? ".." : ""}</h2></Link>
                                    <span className='text-sm'>{getFormattedDate(data[2]?.createdAt)}</span>
                                </div>
                            </div>
                        }
                         {
                            !data[2] &&
                            <div className="w-1/2 rounded-lg border border-gray-300 h-auto xl:h-72 relative">
                                <Skeleton animation="wave" variant="rectangular" height={200} xlHeight={176} className="rounded-t-lg" />
                                <div className="p-2">
                                    <Skeleton animation="wave" height={40} />
                                    <Skeleton animation="wave" height={20} width="80%" />
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Recent