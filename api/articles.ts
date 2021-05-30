import client from './client';
import {Article} from './types';

export async function getArticles({
  limit = 10,
  cursor,
  prevCursor,
}: {
  limit?: number;
  cursor?: number;
  prevCursor?: number;
}) {
  const response = await client.get<Article[]>('/articles', {
    params: {
      _sort: 'id:DESC',
      _limit: limit,
      id_lt: cursor,
      id_gt: prevCursor,
    },
  });
  console.log(
    JSON.stringify({
      _sort: 'id:DESC',
      _limit: limit,
      id_lt: cursor,
      id_gt: prevCursor,
    }),
  );
  return response.data;
}

export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
}

export async function writeArticle(params: {title: string; body: string}) {
  const response = await client.post<Article>('/articles', params);
  return response.data;
}

export async function modifyArticle(params: {
  id: number;
  title: string;
  body: string;
}) {
  const {id, title, body} = params;
  const response = await client.put<Article>(`/articles/${id}`, {title, body});
  return response.data;
}

export async function deleteArticle(id: number) {
  await client.delete<Article>(`/articles/${id}`);
  return null; // 응답 결과가 없기 때문에 null 반환
}
