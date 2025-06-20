import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/api/v1";

const storeEvent = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  // 🔹 GET
  getAllEvents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/events`);
      set({ posts: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getOneEvents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/events/:id`);
      set({ posts: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createEvent: async (newPost) => {
    try {
      const res = await axios.post(`${API_URL}/events`, newPost);
      set((state) => ({ posts: [...state.posts, res.data] }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  createRSVP: async (newPost) => {
    try {
      const res = await axios.post(`${API_URL}/events/:eventId/rsvps`, newPost);
      set((state) => ({ posts: [...state.posts, res.data] }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default storeEvent;
