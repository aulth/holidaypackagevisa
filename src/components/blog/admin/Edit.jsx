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
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.article;
        this.handleChange = this.handleChange.bind(this);
    }
    imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'images');
            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);
            const response = await fetch('https://api.cloudinary.com/v1_1/dbtwfabwy/image/upload', {
                method: 'POST',
                body: data
            });
            const responseData = await response.json();
            let res = responseData.url;
            // Remove placeholder image
            this.quill.deleteText(range.index, 1);
            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            this.quill.insertEmbed(range.index, 'image', res);
            // const res = await this.apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
        };
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }
    handleOnSave = async (e) => {
        e.preventDefault();
        if (!this.state.title) {
            toast.error('Please Enter the Title')
            return;
        }
        if (!this.state.category) {
            toast.error('Please Choose the Category')
            return;
        }
        const response = await fetch('/api/blog/edit', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ data: { title: this.state.title, category: this.state.category, cover: this.state.cover, content: this.state.content, live: false }, id: this.state._id, adminPin: process.env.NEXT_PUBLIC_ADMIN_PIN })
        })
        const json = await response.json();
        if (json.success) {
            toast.success(json.msg)
        } else {
            toast.error(json.msg)
        }
    }
    handleOnPublish = async (e) => {
        e.preventDefault();
        if (!this.state.title) {
            toast.error('Please Enter the Title')
            return;
        }
        if (!this.state.category) {
            toast.error('Please Choose the Category')
            return;
        }
        if (!this.state.cover) {
            toast.error('Please Upload Cover Photo')
            return;
        }
        const response = await fetch('/api/blog/edit', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ data: { title: this.state.title, category: this.state.category, cover: this.state.cover, content: this.state.content, live: true }, id: this.state._id, adminPin: process.env.NEXT_PUBLIC_ADMIN_PIN })
        })
        const json = await response.json();
        if (json.success) {
            toast.success(json.msg)
        } else {
            toast.error(json.msg)
        }
    }
    onError = (err) => {
        toast.error("Cover Photo Not Uploaded");
        console.log(err);
    };
    onSuccess = async (res) => {
        toast.success("Cover Photo Uploaded");
        this.setState({ ...this.state, cover: res.url })
    }
    render() {
        return (
            <>
                <Toaster position='top-right' />
                <div className="container m-auto md:h-screen h-[calc(100vh-56px)] md:mt-0 mt-[56px] overflow-y-auto  relative">
                    {
                        this.state.title &&
                        <form onSubmit={this.handleOnPublish} className="w-full flex flex-col gap-4 bg-white rounded-lg p-4">
                            <div className="w-full flex justify-between">
                                <h2 className="font-bold text-xl">Edit your article</h2>
                                <div className="flex gap-2 items-center text-lg">
                                    <button className='hover:text-cyan-500'><RiArchiveDrawerLine /></button>
                                    <button onClick={this.handleOnSave} className=' hover:text-cyan-500'><AiOutlineSave /></button>
                                    <button type='submit' className='text-xl hover:text-cyan-500'><IoIosSend /></button>
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <input type="text" value={this.state.title} name='title' onChange={this.handleChange} placeholder='Title...' className='p-2 border-b border-gray-200 w-full text-lg font-semibold focus:border-cyan-400 focus:outline-none' />
                            </div>
                            <div className="flex items-center ">
                                <input type="text" value={this.state.category} name='category' onChange={this.handleChange} placeholder='Category' className='p-2 border-b border-gray-200 w-full focus:border-cyan-400 focus:outline-none' />
                            </div>
                            <div className="w-full flex flex-col p-2">
                                <label className='mb-2'>Cover Photo</label>
                                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                                    <IKUpload onSuccess={this.onSuccess} onError={this.onError} />
                                </IKContext>
                            </div>
                            <div className="w-full">
                                <ReactQuill
                                    ref={el => {
                                        this.quill = el;
                                    }}
                                    onChange={(value) => { this.setState({ ...this.state, content: value }) }}
                                    value={this.state.content}
                                    placeholder={this.props.placeholder}
                                    modules={{
                                        toolbar: {
                                            container: [
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
                                                        "#FFDC00", // Yellow
                                                        "#2ECC40", // Green
                                                        "#0074D9", // Blue
                                                        "#001f3f", // Navy
                                                        "#7FDBFF", // Sky Blue
                                                        "#F012BE", // Magenta
                                                        "#B10DC9", // Purple
                                                        "#85144b", // Maroon
                                                        "#39CCCC", // Teal
                                                        "#3D9970", // Olive
                                                        "#2E2E2E", // Dark Gray
                                                        "#AAAAAA", // Gray
                                                        "#F5F5F5", // Light Gray
                                                        "#FF6F61", // Coral
                                                        "#A463F2", // Lavender
                                                        "#FFA07A", // Light Salmon
                                                        "#40E0D0", // Turquoise
                                                        "#C71585", // Medium Violet Red
                                                        "#8B0000", // Dark Red
                                                        "#FFD700", // Gold
                                                        "#FF1493", // Deep Pink
                                                        "#7CFC00", // Lawn Green
                                                        "#4169E1", // Royal Blue
                                                        "#800080", // Purple
                                                        "#008080", // Teal
                                                        "#696969", // Dim Gray
                                                        "#DCDCDC", // Gainsboro
                                                        "#F08080", // Light Coral
                                                        "#DA70D6", // Orchid
                                                        "#FF6347", // Tomato
                                                        "#7B68EE", // Medium Slate Blue
                                                        "#20B2AA", // Light Sea Green
                                                        "#DAA520", // Golden Rod
                                                        "#00CED1", // Dark Turquoise
                                                        "#F4A460", // Sandy Brown
                                                        "#BA55D3", // Medium Orchid
                                                        "#FFC0CB", // Pink
                                                        "#00FA9A", // Medium Spring Green
                                                        "rgb(6,182,212)",
                                                        "rgb(248,113,113)"
                                                    ]
                                                },
                                                {
                                                    'background': [
                                                        "#FF4136", // Red
                                                        "#FF851B", // Orange
                                                        "#FFDC00", // Yellow
                                                        "#2ECC40", // Green
                                                        "#0074D9", // Blue
                                                        "#001f3f", // Navy
                                                        "#7FDBFF", // Sky Blue
                                                        "#F012BE", // Magenta
                                                        "#B10DC9", // Purple
                                                        "#85144b", // Maroon
                                                        "#39CCCC", // Teal
                                                        "#3D9970", // Olive
                                                        "#2E2E2E", // Dark Gray
                                                        "#AAAAAA", // Gray
                                                        "#F5F5F5", // Light Gray
                                                        "#FF6F61", // Coral
                                                        "#A463F2", // Lavender
                                                        "#FFA07A", // Light Salmon
                                                        "#40E0D0", // Turquoise
                                                        "#C71585", // Medium Violet Red
                                                        "#8B0000", // Dark Red
                                                        "#FFD700", // Gold
                                                        "#FF1493", // Deep Pink
                                                        "#7CFC00", // Lawn Green
                                                        "#4169E1", // Royal Blue
                                                        "#800080", // Purple
                                                        "#008080", // Teal
                                                        "#696969", // Dim Gray
                                                        "#DCDCDC", // Gainsboro
                                                        "#F08080", // Light Coral
                                                        "#DA70D6", // Orchid
                                                        "#FF6347", // Tomato
                                                        "#7B68EE", // Medium Slate Blue
                                                        "#20B2AA", // Light Sea Green
                                                        "#DAA520", // Golden Rod
                                                        "#00CED1", // Dark Turquoise
                                                        "#F4A460", // Sandy Brown
                                                        "#BA55D3", // Medium Orchid
                                                        "#FFC0CB", // Pink
                                                        "#00FA9A", // Medium Spring Green
                                                        "rgb(6,182,212)",
                                                        "rgb(248,113,113)"
                                                    ]
                                                }],
                                                ['link', 'video', 'image', 'code-block'],
                                                ['clean'],
                                                [{ 'direction': 'rtl' }],
                                            ],
                                            handlers: {
                                                image: this.imageHandler
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </form>
                    }
                </div>
            </>
        );
    }
}

export default MyComponent;