import { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    loadBookmarks();
    loadRecentlyViewed();
  }, []);

  const loadBookmarks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookmarks'));
      const bookmarksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarks(localBookmarks);
    }
  };

  const loadRecentlyViewed = () => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(viewed);
  };

  const addBookmark = async (article) => {
    try {
      const docRef = await addDoc(collection(db, 'bookmarks'), {
        ...article,
        bookmarkedAt: new Date().toISOString()
      });
      
      const newBookmark = {
        id: docRef.id,
        ...article,
        bookmarkedAt: new Date().toISOString()
      };
      
      setBookmarks([...bookmarks, newBookmark]);
      localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, newBookmark]));
      
      return true;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      const newBookmark = {
        id: Date.now().toString(),
        ...article,
        bookmarkedAt: new Date().toISOString()
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return true;
    }
  };

  const removeBookmark = async (bookmarkId) => {
    try {
      await deleteDoc(doc(db, 'bookmarks', bookmarkId));
      const updatedBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      const updatedBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return true;
    }
  };

  const isBookmarked = (articleId) => {
    return bookmarks.some(b => b.uuid === articleId);
  };

  const addToRecentlyViewed = (article) => {
    const updated = [
      article,
      ...recentlyViewed.filter(a => a.uuid !== article.uuid)
    ].slice(0, 10);
    
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const value = {
    bookmarks,
    recentlyViewed,
    addBookmark,
    removeBookmark,
    isBookmarked,
    addToRecentlyViewed
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};