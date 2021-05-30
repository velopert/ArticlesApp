import client from './client';
import {Comment} from './types';

export async function getComments(articleId: number) {
  const response = await client.get<Comment[]>(
    `/articles/${articleId}/comments`,
  );
  return response.data;
}

export async function writeComment(params: {
  articleId: number;
  message: string;
}) {
  const {articleId, message} = params;
  const response = await client.post<Comment>(
    `/articles/${articleId}/comments`,
    {message},
  );
  return response.data;
}

export async function modifyComment(params: {
  articleId: number;
  message: string;
  id: number;
}) {
  const {articleId, message, id} = params;
  const response = await client.put<Comment>(
    `/articles/${articleId}/comments/${id}`,
    {message},
  );
  return response.data;
}

export async function deleteComment(params: {articleId: number; id: number}) {
  const {articleId, id} = params;
  await client.delete(`/articles/${articleId}/comments/${id}`);
  return null;
}
