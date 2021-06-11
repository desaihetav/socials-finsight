import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewPost,
  getPosts,
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from "../../services/posts";

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

export const savePostById = createAsyncThunk(
  "posts/savePostById",
  async ({ user_id, post_id }) => {
    try {
      const savedPost = await savePost({ user_id, post_id });
      return savedPost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const unsavePostById = createAsyncThunk(
  "posts/unsavePostById",
  async ({ user_id, post_id }) => {
    try {
      const unsavedPost = await unsavePost({ user_id, post_id });
      return unsavedPost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ user_id, content }) => {
    try {
      const post = await createNewPost({ user_id, content });
      return post;
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
    newPostContent: "",
  },
  reducers: {
    updateNewPostContent: (state, action) => {
      state.newPostContent = action.payload.content;
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
    [savePostById.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [savePostById.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      const { user_id, post_id } = action.payload;
      const requiredPost = state.posts.find((post) => post.id === post_id);
      requiredPost.saves.push({
        user: {
          id: user_id,
        },
      });
      requiredPost.saves_aggregate.aggregate.count++;
      state.status = "fulfilled";
    },
    [savePostById.error]: (state) => {
      console.log("error");
      state.status = "error";
    },
    [unsavePostById.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [unsavePostById.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      const { user_id, post_id } = action.payload;
      const requiredPost = state.posts.find((post) => post.id === post_id);
      const updatedSaves = requiredPost.likes.filter(
        (like) => like.user.id !== user_id
      );
      requiredPost.saves = updatedSaves;
      requiredPost.saves_aggregate.aggregate.count--;
      state.status = "fulfilled";
    },
    [unsavePostById.error]: (state) => {
      console.log("error");
      state.status = "error";
    },
    [createPost.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [createPost.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      state.newPostContent = "";
      state.posts.push(action.payload);
      state.status = "fulfilled";
    },
    [createPost.error]: (state) => {
      console.log("error");
      state.status = "error";
    },
  },
});

export const { incrementLike, updateNewPostContent } = postsSlice.actions;

export default postsSlice.reducer;
