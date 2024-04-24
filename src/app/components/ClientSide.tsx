'use client';
import React, { useEffect, useState } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';

interface Topic {
  id: number;
  title: string;
  content: string;
}

function ClientSide() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { user, isAuthenticated } = useKindeAuth();
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');

  useEffect(() => {
    fetch('/api/topics')
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

    fetch('/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  return (
    <div>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            <h2>{topic.title}</h2>
            <p>{topic.content}</p>
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

export default ClientSide;
