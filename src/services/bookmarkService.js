// src/services/bookmarkService.js
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

/**
 * saveBookmark(uid, article)
 * removeBookmark(uid, articleId)
 * listBookmarks(uid) -> returns array of bookmark docs
 */

export async function saveBookmark(uid, article) {
  if (!uid) throw new Error("UID required for Firestore bookmarks");
  const id = article.uuid || article.id || encodeURIComponent(article.title || Date.now().toString());
  const ref = doc(db, "bookmarks", uid, "articles", id.toString());
  const payload = {
    ...article,
    savedAt: new Date().toISOString()
  };
  await setDoc(ref, payload);
  return { id, ...payload };
}

export async function removeBookmark(uid, articleId) {
  if (!uid) throw new Error("UID required for Firestore bookmarks");
  const ref = doc(db, "bookmarks", uid, "articles", articleId.toString());
  await deleteDoc(ref);
  return true;
}

export async function listBookmarks(uid) {
  if (!uid) throw new Error("UID required for Firestore bookmarks");
  const col = collection(db, "bookmarks", uid, "articles");
  const snap = await getDocs(col);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
