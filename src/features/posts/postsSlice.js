import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, likePost, unlikePost } from "../../services/posts";

export const loadAllPosts = createAsyncThunk(
  "posts/loadAllPosts",
  async (user_id) => {
    try {
      const posts = await getPosts(user_id);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const likePostById = createAsyncThunk(
  "posts/likePostById",
  async ({ user_id, post_id }) => {
    try {
      const likedPost = await likePost({ user_id, post_id });
      return likedPost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const unlikePostById = createAsyncThunk(
  "posts/unlikePostById",
  async ({ user_id, post_id }) => {
    try {
      const unlikedPost = await unlikePost({ user_id, post_id });
      return unlikedPost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
  },
  reducers: {
    incrementLike: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.postID === action.payload
      );
      state.posts[postIndex].likes += 1;
    },
  },
  extraReducers: {
    [loadAllPosts.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [loadAllPosts.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log(action.payload.posts);
      state.status = "fulfilled";
      state.posts = action.payload.posts;
    },
    [loadAllPosts.error]: (state) => {
      console.log("error");
      state.status = "error";
    },
    [likePostById.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [likePostById.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      const { user_id, post_id } = action.payload;
      const requiredPost = state.posts.find((post) => post.id === post_id);
      requiredPost.likes.push({
        user: {
          id: user_id,
        },
      });
      requiredPost.likes_aggregate.aggregate.count++;
      state.status = "fulfilled";
    },
    [likePostById.error]: (state) => {
      console.log("error");
      state.status = "error";
    },
    [unlikePostById.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [unlikePostById.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      const { user_id, post_id } = action.payload;
      const requiredPost = state.posts.find((post) => post.id === post_id);
      const updatedLikes = requiredPost.likes.filter(
        (like) => like.user.id !== user_id
      );
      requiredPost.likes = updatedLikes;
      requiredPost.likes_aggregate.aggregate.count--;
      state.status = "fulfilled";
    },
    [unlikePostById.error]: (state) => {
      console.log("error");
      state.status = "error";
    },
  },
});

export const { incrementLike } = postsSlice.actions;

export default postsSlice.reducer;
