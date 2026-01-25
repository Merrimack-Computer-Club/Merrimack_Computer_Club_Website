import React, { useEffect, useState } from 'react';
import CreatePostForm from "../components/CreatePostForm";
import Post from "../components/Post";
import ArticleList from "../components/ArticleList";
import { Autocomplete } from '@mantine/core';
import { database } from './firebaseConfig';
import { ref, onValue } from "firebase/database";

// Interface for comment objects within a post
interface PostComment {
  [key: string]: {
    author?: string;
    content?: string;
    timestamp?: string;
  };
}

// Interface for a knowledgebase post
interface KnowledgebasePost {
  title: string | null;
  maintainer: string;
  maintainer_email: string;
  creationTime: string;
  updateTime: string;
  information: string;
  tags?: string[];
  resources?: { [key: string]: string };
  in_comments?: PostComment;
}

// Props interface for Knowledgebase component
interface KnowledgebaseProps {
  // Add any props that are passed to this component
  [key: string]: unknown;
}

function Knowledgebase(props: KnowledgebaseProps): React.ReactElement {

  const [search, setSearch] = useState<string>(''); // Represents what is in the search parameter
  const [posts, setPosts] = useState<KnowledgebasePost[]>([]); // represents all posts
  const [displayedPosts, setDisplayedPosts] = useState<KnowledgebasePost[]>([]);

  useEffect(() => {
    const temp: KnowledgebasePost[] = [];
    // Get all of the titles and append them to titles
    try {
      onValue(ref(database, `knowledgebase`), (snapshot) => {
        snapshot.forEach((child) => {
          temp.push(child.toJSON() as KnowledgebasePost);
        });

        setPosts(temp);
      });
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  /**
   * Called when an element is selected from the Posts search bar
   * @param value - The search value submitted
   */
  function onSearchSubmit(value: string): void {
    // Remove searches if value is null or undefined
    if (value === null || value === undefined || value.trim().length === 0) {
      setDisplayedPosts([]);
      return;
    }

    setDisplayedPosts(posts.filter((n) => n.title !== null && n.title !== undefined && n.title === value));
  }

  /**
   * Called when the value of Autocomplete for search is called
   * @param value - The current search input value
   */
  function setSearchValue(value: string): void {
    setSearch(value);
    // Remove searches if value is null or undefined
    if (value === null || value === undefined || value.trim().length === 0) {
      setDisplayedPosts([]);
    }
  }

  /**
   * Called when an article is clicked from the ArticleList
   * @param title - The title of the article to display
   */
  function handleArticleClick(title: string): void {
    setSearch(title);
    setDisplayedPosts(posts.filter((n) => n.title !== null && n.title !== undefined && n.title === title));
  }

  // Generate autocomplete data - filter out null/undefined titles and get unique values
  const autocompleteData: string[] = posts
    .map((n) => n.title)
    .filter((title): title is string => title !== null && title !== undefined)
    .filter((value, index, array) => array.indexOf(value) === index);

  return (
    <div className='knowledgebase'>

      {/* Autocomplete tab for searching data */}
      <div className='search'>
        <Autocomplete
          label="Search"
          onOptionSubmit={onSearchSubmit}
          data={autocompleteData}
          value={search}
          onChange={setSearchValue}
          comboboxProps={{ shadow: 'md', transitionProps: { transition: 'pop', duration: 200 } }}
        />
      </div>

      {/* Main content area with sidebar and posts */}
      <div className='knowledgebase-content'>
        {/* Left sidebar with article list */}
        <div className='article-sidebar'>
          {/* @ts-expect-error - ArticleList is a JS component, types will be added when converted to TS */}
          <ArticleList posts={posts} onArticleClick={handleArticleClick} />
        </div>

        {/* Right side with displayed posts */}
        <div className='posts-main'>
          {/* Display a list of posts from displayedPosts */}
          <div className='posts' style={{ paddingTop: '20px', height: 'fit-content' }}>
            {displayedPosts.map((n) => {
              return (
                <Post
                  key={n.title}
                  userID={n.maintainer}
                  userEmail={n.maintainer_email}
                  createTime={n.creationTime}
                  updateTime={n.updateTime}
                  information={n.information}
                  title={n.title}
                  tags={n.tags}
                  resources={n.resources}
                  in_comments={n.in_comments}
                />
              );
            })}
          </div>
        </div>
      </div>

      <CreatePostForm />

    </div>
  );
}

export default Knowledgebase;
