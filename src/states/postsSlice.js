import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  isLoding: false,
  error: null,
  record: null,
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3009/posts');
      if (!res.ok)
        throw new Error('404 cannot fetch data, please re frech the page');
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3009/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('A probleme in tour Deletting');

      return postId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (postContent, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const res = await fetch('http://localhost:3009/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...postContent, authId: auth.id }),
      });
      if (!res.ok) throw new Error('server error');
      const newPost = await res.json();
      return newPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPostDetails = createAsyncThunk(
  'posts/getPostdetails',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const res = await fetch(`http://localhost:3009/posts/${postId}`);
      if (!res.ok) throw new Error('404, Not found: cannot fetch the details');
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postInfo, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3009/posts/${postInfo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postInfo),
      });
      if (!res.ok)
        throw new Error('network Error, please check Your your internet');
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setIsLoding(state, action) {
      state.isLoding = true;
    },
  },
  extraReducers: {
    // get postes
    [getPosts.pending](state, action) {
      state.isLoding = true;
      state.error = null;
    },
    [getPosts.fulfilled](state, action) {
      state.isLoding = false;
      if (!action.payload) {
        state.records = [];
      } else {
        state.records = action.payload;
      }
    },
    [getPosts.rejected](state, action) {
      state.isLoding = false;
      state.error = action.payload;
    },
    // delete Post
    [deletePost.pending](state, action) {
      state.isLoding = true;
      state.error = null;
    },
    [deletePost.fulfilled](state, action) {
      state.isLoding = false;
      state.records = state.records.filter(
        (post) => post.id !== action.meta.arg
      );
    },
    [deletePost.rejected](state, action) {
      state.isLoding = false;
      state.error = action.payload;
    },
    // add Post
    [addPost.pending](state, action) {
      state.isLoding = true;
      state.error = null;
    },
    [addPost.fulfilled](state, action) {
      state.isLoding = false;
      state.records.push(action.payload);
    },
    [addPost.rejected](state, action) {
      state.isLoding = false;
      state.error = action.payload;
    },
    // getPostDetails
    [getPostDetails.pending](state, action) {
      state.isLoding = true;
      state.error = null;
      state.record = null;
    },
    [getPostDetails.fulfilled](state, action) {
      state.isLoding = false;
      state.record = action.payload;
    },
    [getPostDetails.rejected](state, action) {
      state.isLoding = false;
      state.error = action.payload;
    },
    // update Post
    [updatePost.pending](state, action) {
      state.isLoding = true;
      state.error = null;
      state.record = null;
    },
    [updatePost.fulfilled](state, action) {
      state.isLoding = false;
    },
    [updatePost.rejected](state, action) {
      state.isLoding = true;
      state.error = action.payload;
    },
  },
});

export const { setError, setIsLoding } = postsSlice.actions;
export default postsSlice.reducer;
