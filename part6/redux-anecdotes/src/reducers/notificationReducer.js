import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addMsg(state, action) {
      const anecdote = action.payload
      console.log('anecdote', anecdote)
      state = `you voted '${anecdote}'`
      return state
    },
    clearMsg(state, action) {
      state = ''
      return state
    },
  },
})

export const { addMsg, clearMsg } = notificationSlice.actions
export default notificationSlice.reducer
