const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'beb1c189e0b2b59e91f2fd687dc9ebf0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
