import create from 'zustand';

const useAuthStore = create((set) => ({
  auth: {
    username: '',
    active: false
  },
  setUsername: (name) =>
    set((state) => ({
      auth: { ...state.auth, username: name }
    }))
}));

export default useAuthStore;