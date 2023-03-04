const baseUrl = process.env.NODE_ENV === "production" 
? 'http://13.235.128.230:3000' 
: 'http://localhost:3000';

// const baseUrl = "https://main.d37wu5s0v422br.amplifyapp.com"

// const baseUrl = "https://nextjs-learning-platform.vercel.app"

// const baseUrl = "http://localhost:3000";

export default baseUrl;
