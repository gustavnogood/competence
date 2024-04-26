

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react', 'react-dom'],
          'axios': ['axios'],
          // Add more chunks as needed
        },
      },
    },
  },
};