// src/hooks/useBookmarks.js
import { useEffect, useState } from "react";
import { saveBookmark as saveBookmarkFirestore, removeBookmark as removeBookmarkFirestore, listBookmarks as listBookmarksFirestore } from "../services/bookmarkService";

/**
 * useBookmarks({ user })
 * - user: firebase user object or null
 * - returns { bookmarks, add, remove, has }
 *
 * Fallback: if no user, use localStorage key 'bookmarks_local'
 */

export default function useBookmarks({ user = null } = {}) {
  const localKey = "bookmarks_local";
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem(localKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // when user becomes available, try to load from Firestore
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (user && user.uid) {
        try {
          const list = await listBookmarksFirestore(user.uid);
          if (!mounted) return;
          setBookmarks(list);
          // sync to localStorage as cache
          localStorage.setItem(localKey, JSON.stringify(list));
        } catch (e) {
          // fallback keep localStorage
          console.warn("Failed fetch firestore bookmarks, using local", e);
        }
      } else {
        // keep current local bookmarks
      }
    })();
    return () => { mounted = false; };
  }, [user]);

  const persistLocal = (next) => {
    try {
      localStorage.setItem(localKey, JSON.stringify(next));
    } catch {}
  };

  const add = async (article) => {
    const id = article.uuid || article.id || encodeURIComponent(article.title || Date.now().toString());
    const already = bookmarks.find(b => (b.uuid || b.id || b.id === id || b.id === id));
    if (already) return;
    const newItem = { id, ...article, savedAt: new Date().toISOString() };
    const next = [newItem, ...bookmarks];
    setBookmarks(next);
    persistLocal(next);

    if (user && user.uid) {
      try {
        await saveBookmarkFirestore(user.uid, article);
      } catch (e) {
        console.warn("Failed to save bookmark to firestore:", e);
      }
    }
  };

  const remove = async (article) => {
    const id = article.uuid || article.id || encodeURIComponent(article.title || "");
    const next = bookmarks.filter(b => (b.uuid || b.id || b.id) !== id && b.id !== id);
    setBookmarks(next);
    persistLocal(next);

    if (user && user.uid) {
      try {
        await removeBookmarkFirestore(user.uid, id);
      } catch (e) {
        console.warn("Failed to remove bookmark from firestore:", e);
      }
    }
  };

  const has = (article) => {
    if (!article) return false;
    const id = article.uuid || article.id || encodeURIComponent(article.title || "");
    return bookmarks.some(b => (b.uuid === id || b.id === id || b.id === (article.id || article.uuid)));
  };

  return { bookmarks, add, remove, has };
}
