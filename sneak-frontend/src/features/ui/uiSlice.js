import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,       
  isShoppingPanelOpen: false, 
  isProfileModalOpen: false, // <-- NEW: State for Profile Modal
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar Actions
    toggleSidebar: (state) => { state.isSidebarOpen = !state.isSidebarOpen; },
    closeSidebar: (state) => { state.isSidebarOpen = false; },
    openSidebar: (state) => { state.isSidebarOpen = true; },

    // Shopping Panel Actions
    toggleShoppingPanel: (state) => { state.isShoppingPanelOpen = !state.isShoppingPanelOpen; },
    closeShoppingPanel: (state) => { state.isShoppingPanelOpen = false; },
    openShoppingPanel: (state) => { state.isShoppingPanelOpen = true; },

    // --- NEW: Profile Modal Actions ---
    toggleProfileModal: (state) => { state.isProfileModalOpen = !state.isProfileModalOpen; },
    closeProfileModal: (state) => { state.isProfileModalOpen = false; },
    openProfileModal: (state) => { state.isProfileModalOpen = true; },
  },
});

export const { 
  toggleSidebar, closeSidebar, openSidebar,
  toggleShoppingPanel, closeShoppingPanel, openShoppingPanel,
  toggleProfileModal, closeProfileModal, openProfileModal // Export new actions
} = uiSlice.actions;

export default uiSlice.reducer;