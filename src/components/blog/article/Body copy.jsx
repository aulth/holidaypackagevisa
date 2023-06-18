import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineShareAlt } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast';
import { RiPencilFill } from 'react-icons/ri'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedInShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    PinterestShareButton,
    PinterestIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon
} from 'next-share';
import { Button } from '@mui/material';
import { LinkOutlined } from '@mui/icons-material';
const Body = ({ data }) => {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);
    const getFormattedDate = (str) => {
        const date = new Date(str);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }
    useEffect(() => {
        if (typeof window != undefined) {
            document.querySelector('.body').innerHTML = data.content;
        }
    }, [data])
    const shareData = {
        title: data.title,
        text: data.content.slice(0, 150).replace(/<[^>]+>/g, '') + "..",
        url: `https://mohd-usman.vercel.app/blog/article/${data.link}`
    }
    const sharePost = async () => {
        try {
            if (!navigator.canShare) {
                output.textContent = `Your browser doesn't support the Web Share API.`
                return
            }
            await navigator.share(shareData);
        } catch (err) {
            toast.error(err)
            return;
        }
    }
    return (
        <>
            <Toaster position='top-right' />
            <div className="w-full rounded-lg p-4">
                <nav className="text-sm text-red-500">
                    <ol className='list-none p-0 inline-flex gap-1'>
                        <li className="flex gap-1 items-center">
                            <Link href={'/blog'} className='hover:text-red-600 hover:underline'>Home</Link>
                            &gt;
                        </li>
                        {
                            data.category.split(' ').map((item, index) => (
                                <React.Fragment key={index}>
                                  <li className="flex items-center">
                                    <Link href={`/blog/category/${item.toLowerCase()}`} className="hover:text-red-600 hover:underline">
                                      {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                                    </Link>
                                  </li>
                                  {index < data.category.split(' ').length - 1 && '>'}
                                </React.Fragment>
                              ))
                        }
                    </ol>
                </nav>
                <h1 className="font-bold text-2xl mt-2 capitalize">{data.title}</h1>
                <div className="w-full flex justify-between md:flex-row flex-col md:items-center items-start  text-sm mt-2">
                    <time className="text-gray-500 text-sm"><span className="mr-1">Published:</span> {getFormattedDate(data.createdAt)}</time>
                    {/* <button onClick={sharePost} className='hover:text-red-500'><AiOutlineShareAlt /></button> */}
                    <div className="flex md:mt-0 mt-2 justify-end gap-2">
                        <FacebookShareButton
                            url={currentUrl}
                            quote={data.title}
                            hashtag={'#' + data.category.split(' ').map(item => item[0].toUpperCase() + item.slice(1)).join('')}
                        >
                            <FacebookIcon size={24} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={currentUrl} title={data.title}>
                            <TwitterIcon size={24} round />
                        </TwitterShareButton>
                        <PinterestShareButton
                            url={currentUrl}
                            media={data.cover}
                        >
                            <PinterestIcon size={24} round />
                        </PinterestShareButton>
                        <RedditShareButton
                            url={currentUrl}
                            title={data.title}
                        >
                            <RedditIcon size={24} round />
                        </RedditShareButton>
                        <TelegramShareButton
                            url={currentUrl}
                            title={data.title}
                        >
                            <TelegramIcon size={24} round />
                        </TelegramShareButton>
                        <WhatsappShareButton
                            url={currentUrl}
                            title={data.title}
                        >
                            <WhatsappIcon size={24} round />
                        </WhatsappShareButton>
                        <button onClick={() => { navigator.clipboard.writeText(currentUrl); toast.success("Copied") }} className='bg-gray-200 p-0.5 rounded-full text-center aspect-square w-6'>
                            <LinkOutlined className='text-sm rotate-45' />
                        </button>
                    </div>
                </div>
                <main className='mt-4  body article-body clear-none'>
                </main>
            </div>
        </>
    )
}

export default Body