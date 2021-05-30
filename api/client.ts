import axios from 'axios';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
const baseURL = __DEV__
  ? 'http://localhost:1337'
  : 'https://articles.example.com';

const client = axios.create({
  baseURL,
});

export default client;
