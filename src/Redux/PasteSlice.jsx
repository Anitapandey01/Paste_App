import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = {
    pastes: JSON.parse(localStorage.getItem("pastes")) || []
}

export const PasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);

            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste created successfully");
        },

        updateToPaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex(
                (item) => item._id === paste._id
            );

            if (index >= 0) {
                state.pastes[index] = paste;

                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste updated successfully");
            }
        },

        RemoveToPaste: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex(
                (item) => item._id === pasteId
            );

            if (index >= 0) {
                state.pastes.splice(index, 1);

                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste deleted successfully");
            }
        },

        ResetAllToPaste: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("All pastes deleted");
        }
    }
});

export const {
    addToPaste,
    updateToPaste,
    RemoveToPaste,
    ResetAllToPaste
} = PasteSlice.actions;

export default PasteSlice.reducer;