'use client';
import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';

interface User {
  id: number;
  email: string;
  given_name: string;
  family_name?: string;
  picture?: string;
  // Ajoutez d'autres propriétés en fonction des données renvoyées par Kinde
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getUserData');
        const userData = await response.json();
        if (userData) {
          setUser(userData as User);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUploadImage = async (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok && user) {
          // Mettez à jour l'URL de l'image de profil dans votre base de données
          const updatedUser = await fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ picture: data.url }),
          });

          if (updatedUser.ok) {
            // Récupérez à nouveau les données de l'utilisateur après la mise à jour
            const response = await fetch('/api/getUserData');
            const userData = await response.json();
            if (userData) {
              setUser(userData as User);
            }
          } else {
            setError('Failed to update profile picture');
          }
        } else {
          setError(data.message || 'Failed to upload image');
        }
      } catch (error) {
        setError('Network error');
      } finally {
        setUploading(false);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1 className={styles.heading}>User Profile</h1>
        <h2 className={styles.name}>{user.given_name} {user.family_name}</h2>
      </div>
      <div className={styles.profileCard}>
        <div className={styles.profileImageContainer}>
          <img src={user.picture} alt="Profile" className={styles.profileImage} />
          <div className={styles.uploadSection}>
            <label htmlFor="file-upload" className={styles.customFileUpload}>
              Change Profile Picture
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement | null>) =>
                handleUploadImage(event as unknown as { target: { files: any[]; }; })
              }
              accept="image/*"
            />
            {uploading && <p className={styles.uploadingText}>Uploading...</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.name}>{user.given_name} {user.family_name}</h2>
          <p className={styles.email}>Email: {user.email}</p>
          {/* Affichez d'autres informations de l'utilisateur renvoyées par Kinde */}
        </div>
      </div>
    </div>
  );
}