import React, { useEffect, useState } from 'react'
import GalleryCard from '../components/GalleryCard';
import { Spinner } from 'flowbite-react';

export default function Gallery() {
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/server/post/getposts?limit=9`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                    setLoading(false);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    if (loading)
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );
  return (
        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recent Posts</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
              {recentPosts &&
                  recentPosts.map((posts) => <GalleryCard key={posts._id} posts={posts} />)}
          </div>
      </div>
  )
}
