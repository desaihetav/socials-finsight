import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewPost,
  getPosts,
  likePost,
  repostPost,
  savePost,
  unlikePost,
  unrepostPost,
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
  async (variables) => {
    try {
      const likedPost = await likePost(variables);
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
  async (variables) => {
    try {
      const savedPost = await savePost(variables);
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

export const repostPostById = createAsyncThunk(
  "posts/repostPostById",
  async (variables) => {
    try {
      const repostedPost = await repostPost(variables);
      return repostedPost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const unrepostPostById = createAsyncThunk(
  "posts/unrepostPostById",
  async ({ user_id, post_id }) => {
    try {
      const unrepostedPost = await unrepostPost({ user_id, post_id });
      return unrepostedPost;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ user_id, content, parent_post }) => {
    try {
      const post = await createNewPost({ user_id, content, parent_post });
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
    },
    [loadAllPosts.fulfilled]: (state, action) => {
      const { posts, reposts } = action.payload;
      const repostsFormatted = reposts.map((repost) => ({
        ...repost.post,
        repost_user_name: repost.user.name,
        repost_user_id: repost.user.id,
      }));
      state.status = "fulfilled";
      const finalPosts = posts
        .concat(repostsFormatted)
        .sort((a, b) => (new Date(b.created) > new Date(a.created) ? 1 : -1));
      state.posts = finalPosts;
    },
    [loadAllPosts.rejected]: (state) => {
      state.status = "error";
    },
    [likePostById.pending]: (state) => {
      state.status = "loading";
    },
    [likePostById.fulfilled]: (state, action) => {
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
    [likePostById.rejected]: (state) => {
      state.status = "error";
    },
    [unlikePostById.pending]: (state) => {
      state.status = "loading";
    },
    [unlikePostById.fulfilled]: (state, action) => {
      const { post_id } = action.payload;
      const requiredPost = state.posts.find((post) => post.id === post_id);
      requiredPost.likes.splice(
        requiredPost.likes.findIndex((post) => post.id === post_id, 1)
      );
      requiredPost.likes_aggregate.aggregate.count--;
      state.status = "fulfilled";
    },
    [unlikePostById.rejected]: (state) => {
      state.status = "error";
    },
    [savePostById.pending]: (state) => {
      state.status = "loading";
    },
    [savePostById.fulfilled]: (state, action) => {
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
    [savePostById.rejected]: (state) => {
      state.status = "error";
    },
    [unsavePostById.pending]: (state) => {
      state.status = "loading";
    },
    [unsavePostById.fulfilled]: (state, action) => {
      const { post_id } = action.payload;
      const requiredPost = state.posts.find((post) => post.id === post_id);
      requiredPost.saves.splice(
        requiredPost.saves.findIndex((post) => post.id === post_id, 1)
      );
      requiredPost.saves_aggregate.aggregate.count--;
      state.status = "fulfilled";
    },
    [unsavePostById.rejected]: (state) => {
      state.status = "error";
    },
    [repostPostById.pending]: (state) => {
      state.status = "loading";
    },
    [repostPostById.fulfilled]: (state, action) => {
      const { user, post } = action.payload;
      const requiredPost = state.posts.find(
        (postItem) => postItem.id === post.id
      );
      requiredPost.reposts.push({
        user: {
          id: user.id,
        },
      });
      requiredPost.reposts_aggregate.aggregate.count++;
      post.repost_user_id = user.id;
      post.repost_user_name = user.name;
      state.posts.push(post);
      state.posts.sort((a, b) =>
        new Date(b.created) > new Date(a.created) ? 1 : -1
      );
      state.status = "fulfilled";
    },
    [repostPostById.rejected]: (state) => {
      state.status = "error";
    },
    [unrepostPostById.pending]: (state) => {
      state.status = "loading";
    },
    [unrepostPostById.fulfilled]: (state, action) => {
      const { user_id, post_id } = action.payload;
      const requiredPost = state.posts.find(
        (post) => post.id === post_id && !post.repost_user_id
      );
      requiredPost.reposts.length = 0;
      requiredPost.reposts_aggregate.aggregate.count--;
      state.posts.splice(
        state.posts.findIndex(
          (post) => post.id === post_id && post.repost_user_id === user_id
        ),
        1
      );
      state.status = "fulfilled";
    },
    [unrepostPostById.rejected]: (state) => {
      state.status = "error";
    },
    [createPost.pending]: (state) => {
      state.status = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.newPostContent = "";
      state.posts.push(action.payload);
      state.posts.sort((a, b) =>
        new Date(b.created) > new Date(a.created) ? 1 : -1
      );
      state.status = "fulfilled";
    },
    [createPost.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { incrementLike, updateNewPostContent } = postsSlice.actions;

export default postsSlice.reducer;
