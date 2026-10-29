// Base URL for API calls. Supports Vercel production environment variable VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') 
  : 'http://localhost:3000';

export default BASE_URL;
