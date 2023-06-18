import React from 'react'
import Recent from '@/components/blog/home/Recent'
import Navbar from '@/components/blog/Navbar'
import Home from '@/components/blog/home/Home'
import Footer from '@/components/blog/Footer'
const Blog = ({ data }) => {

  return (
    <>
      <Navbar />
      <Recent data={data.reverse()} />
      <Home data={data} />
      <Footer />
    </>
  )
}

export default Blog
export async function getServerSideProps(context) {
  const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN+'/api/blog/fetchall')
  var data = await response.json();
  if (data.success) {
    data = data.article;
    data = data.filter(item => item.live)
  } else {
    data = "";
  }
  return {
    props: {
      data: data
    }, // will be passed to the page component as props
  }
}