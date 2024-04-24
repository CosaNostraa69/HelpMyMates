'use client';
import React from 'react';
import  { useEffect, useState } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';

interface Topic {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  userId: number;
}

function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { user, isAuthenticated } = useKindeAuth();
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');


  useEffect(() => {
    fetch('../api/topics/index.ts')
      .then(response => response.json())
      .then(data => setTopics(data))
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  function handleNewTopicSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to create topics.');
      return;
    }
    const topicData = {
      title: newTopicTitle,
      content: newTopicContent,
      userId: user?.id,
    };
    fetch('../api/topics/index.ts?create=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicData),
    })
      .then(response => response.json())
      .then((addedTopic: Topic) => {
        setTopics(prevTopics => [...prevTopics, addedTopic]);
        setNewTopicTitle('');
        setNewTopicContent('');
      })
      .catch(console.error);
  }

  function handleNewCommentSubmit(event: React.FormEvent, topicId: number) {
    event.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to create comments.');
      return;
    }
    const commentData = {
      content: newCommentContent,
      userId: user?.id,
    };
    fetch(`/api/topics/${topicId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(response => response.json())
      .then((addedComment: Comment) => {
        setTopics(prevTopics =>
          prevTopics.map(topic =>
            topic.id === topicId
              ? { ...topic, comments: [...topic.comments, addedComment] }
              : topic
          )
        );
        setNewCommentContent('');
      })
      .catch(console.error);
  }

  return (
    <div>
      <h2>ddddd</h2>
    <ul>
      {topics.map(topic => (
        <li key={topic.id}>
          <h2>{topic.title}</h2>
          <p>{topic.content}</p>
          <ul>
            {topic.comments.map(comment => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
          {isAuthenticated && (
            <form onSubmit={e => handleNewCommentSubmit(e, topic.id)}>
              <input
                type="text"
                value={newCommentContent}
                onChange={e => setNewCommentContent(e.target.value)}
                placeholder="Comment"
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          )}
        </li>
      ))}
    </ul>
    {isAuthenticated && (
      <form onSubmit={handleNewTopicSubmit}>
        <input
          type="text"
          value={newTopicTitle}
          onChange={e => setNewTopicTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={newTopicContent}
          onChange={e => setNewTopicContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Create Topic</button>
      </form>
    )}
  </div>
  );
}

export default TopicsPage;
