import client from './client';
import {Article} from './types';

export async function getArticles() {
  const response = await client.get<Article[]>('/articles');
  return response.data;
}
