import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { AiOutlineSave } from 'react-icons/ai'
import { RiArchiveDrawerLine } from 'react-icons/ri'
import { IoIosSend } from 'react-icons/io'
import { MdOutlineInsertPhoto } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast';
import { IKContext, IKUpload } from 'imagekitio-react';
const publicKey = process.env.NEXT_PUBLIC_imagekitPublicKey;
const urlEndpoint = process.env.NEXT_PUBLIC_imagekitUrlEndPoint;
const authenticationEndpoint = process.env.NEXT_PUBLIC_DOMAIN + '/api/imagekit/get';
import 'react-quill/dist/quill.snow.css';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const Publish = () => {
    const [data, setData] = useState({ title: '', category: '', cover: '' });
    const [content, setContent] = useState('')
    const handleOnContentChange = (e) => {
        setContent(e);
    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleOnPublish = async (e) => {
        e.preventDefault();
        if (!data.title) {
            toast.error('Please Enter the Title')
            return;
        }
        if (!data.category) {
            toast.error('Please Choose the Category')
            return;
        }
        if (!data.cover) {
            toast.error('Please Upload Cover Photo')
            return;
        }
        document.querySelector('.adminVerify').classList.remove('hidden');
    }
    const verifyAndPublish = async (e) => {
        e.preventDefault();
        if (document.getElementById('pin').value == process.env.NEXT_PUBLIC_ADMIN_PIN) {
            toast.success("Authenticated");
            document.querySelector('.adminVerify').classList.add('hidden');
            const response = await fetch('/api/blog/create', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ data: { title: data.title, category: data.category, cover: data.cover, content: content, live: true } })
            })
            const json = await response.json();
            if (json.success) {
                toast.success(json.msg)
            } else {
                toast.error(json.msg)
            }
        } else {
            toast.error("Not authenticated")
        }
    }
    const handleOnSave = async (e) => {
        e.preventDefault();
        if (!data.title) {
            toast.error('Please Enter the Title')
            return;
        }
        if (!data.category) {
            toast.error('Please Choose the Category')
            return;
        }
        const response = await fetch('/api/blog/create', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ data: { title: data.title, category: data.category, cover: data.cover, content: content, live: false } })
        })
        const json = await response.json();
        if (json.success) {
            toast.success(json.msg)
        } else {
            toast.error(json.msg)
        }
    }
    const onError = (err) => {
        toast.error("Cover Photo Not Uploaded");
        console.log(err);
    };
    const onSuccess = async (res) => {
        toast.success("Cover Photo Uploaded");
        setData({ ...data, cover: res.url });
    }
    const handleImageUpload = async (file) => {
        try {
          const formData = new FormData();
          formData.append('image', file);
      
          const response = await fetch(
            "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
            {
              method: "POST",
              body: formData,
            }
          );
          
          const result = await response.json();
          const imageUrl = result.data.imageUrl;
          const range = this.quill.getSelection();
          this.quill.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
          console.error('Error uploading image', error);
        }
      };
      
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{
                'color': [
                    "#FF4136", // Red
                    "#FF851B", // Orange
                ]
            },
            {
                'background': [
                    "#FF4136", // Red
                    "#FF851B", // Orange
                ]
            }],
            ['link', 'image', 'video', 'code-block'],
            ['clean'],
            [{ 'direction': 'rtl' }],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
    return (
        <>
            <Toaster position='top-right' />
            <div className="container m-auto md:h-screen h-[calc(100vh-56px)] md:mt-0 mt-[56px] overflow-y-auto  relative">
                <form onSubmit={handleOnPublish} className="w-full flex flex-col gap-4 bg-white rounded-lg p-4">
                    <div className="w-full flex justify-between">
                        <h2 className="font-bold text-xl">Compose your article</h2>
                        <div className="flex gap-2 items-center text-lg">
                            <button className='hover:text-cyan-500'><RiArchiveDrawerLine /></button>
                            <button onClick={handleOnSave} className=' hover:text-cyan-500'><AiOutlineSave /></button>
                            <button type='submit' className='text-xl hover:text-cyan-500'><IoIosSend /></button>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <input type="text" name='title' onChange={handleOnChange} placeholder='Title...' className='p-2 border-b border-gray-200 w-full text-lg font-semibold focus:border-cyan-400 focus:outline-none' />
                    </div>
                    <div className="flex items-center ">
                        <input type="text" name='category' onChange={handleOnChange} placeholder='Category' className='p-2 border-b border-gray-200 w-full focus:border-cyan-400 focus:outline-none' />
                    </div>
                    <div className="w-full flex flex-col p-2">
                        <label className='mb-2'>Cover Photo</label>
                        <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                            <IKUpload onSuccess={onSuccess} onError={onError} />
                        </IKContext>
                    </div>
                    <div className="w-full">
                        <QuillNoSSRWrapper modules={modules} onChange={handleOnContentChange} theme="snow" />
                    </div>
                </form>
            </div>
            <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 hidden  adminVerify">
                {/* Modal background */}
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
                {/* Modal content */}
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <form onSubmit={verifyAndPublish} className="m-auto w-full flex flex-col gap-4 p-4">
                        <h2 className="font-semibold text-center">Admin Password</h2>
                        <input type="text" placeholder='Pin' id='pin' className='w-full p-1 focus:border-cyan-400 focus:outline-none border-b border-gray-200' required />
                        <div className="w-full flex gap-2">
                            <button type="submit" className='w-full px-2 py-1 bg-gradient-to-tr from-cyan-400 to-blue-400 text-white'>Verify</button>
                            <button type="button" onClick={() => { document.querySelector('.adminVerify').classList.add('hidden') }} className='w-8 flex justify-center items-center  p-1 bg-gradient-to-tr from-cyan-400 to-blue-400 text-white'><IoMdClose className='text-white' /></button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Publish