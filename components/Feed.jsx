"use client";

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsFiltered, setPostsFiltered] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e);
    setPostsFiltered(posts.filter((post) => post.prompt.toLowerCase().includes(e.toLowerCase()) || post.tag.toLowerCase().includes(e.toLowerCase())));
  }

  const handleTagClick = (e) => {
    handleSearchChange(e);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setPostsFiltered(data);
    }

    fetchPosts();
  }, [])
  

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          value={searchText}
          placeholder="Search for a tag or a username"
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={postsFiltered}
        handleTagClick={handleTagClick}
      />
    </section>

  )
}

export default Feed