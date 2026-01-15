import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null,hydrated:false };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: (state, action) => {
      state.data = null;
    },
    setHydrated:(state,action)=>{
      state.hydrated=action.payload
    }
  },
});

export default userSlice.reducer;
export const { loadUser ,resetUser,setHydrated} = userSlice.actions;
