import { useState, useEffect } from 'react'
import axios from 'axios';
import './InstagramPosts.css'

const options = {
    method: 'GET',
    mode: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    }
}

const QUERY_URL = `/api/instagram-posts`
// console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
async function fetchPostData() {
    const postData = await axios.get(QUERY_URL, options).then(res => res.data)
    console.log(postData)
    setPosts(postData)
}
fetchPostData();

export default function InstagramPosts () {
    const [posts, setPosts] = useState(null)
    
    useEffect(() => {
    }, [])

    return (
        <div>
            <h1>POSTS</h1>
            {posts}
        </div>
    )
};