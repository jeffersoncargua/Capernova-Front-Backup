import {createSlice} from '@reduxjs/toolkit';

const playlistSlice = createSlice({
    name:'playList',
    initialState:{
        playList:[]
    },
    reducers:{
        addVideo(state,action){
            const videoInPlaylist = state.playList.find(video => video.id === action.payload.id);
            //console.log(videoInPlaylist);
            if(!videoInPlaylist){
                const updatePlaylist = state.playList.concat(action.payload);
                return {...state, playList:updatePlaylist}
            }
        },
        clearPlaylist(state,action){
            return {...state, playList:action.payload}
        }
    }
});

export const {addVideo,clearPlaylist} = playlistSlice.actions;
export const playListReducer = playlistSlice.reducer;