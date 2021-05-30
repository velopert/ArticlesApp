import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/core';
import {RootStackParamList} from './types';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getArticle} from '../api/articles';
import {deleteComment, getComments, modifyComment} from '../api/comments';
import ArticleView from '../components/ArticleView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommentItem from '../components/CommentItem';
import {useUserState} from '../contexts/UserContext';
import CommentInput from '../components/CommentInput';
import AskDialog from '../components/AskDialog';
import {Comment} from '../api/types';
import CommentModal from '../components/CommentModal';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets();
  const [currentUser] = useUserState();
  const {mutate: modify} = useMutation(modifyComment, {
    onSuccess: comment => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments
          ? comments.map(c => (c.id === selectedCommentId ? comment : c))
          : [],
      );
    },
  });

  const [selectedCommentId, setSelectedCommentId] =
    useState<number | null>(null);
  const [askRemoveComment, setAskRemoveComment] = useState(false);
  const [modifying, setModifying] = useState(false);

  const queryClient = useQueryClient();
  const {mutate: remove} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments ? comments.filter(c => c.id !== selectedCommentId) : [],
      );
    },
  });

  const onRemove = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };

  const onConfirmRemove = () => {
    setAskRemoveComment(false);
    remove({
      id: selectedCommentId!, // null이 아님을 지정하기 위하여 ! 사용
      articleId: id,
    });
  };
  const onCancelRemove = () => {
    setAskRemoveComment(false);
  };

  const onModify = (commentId: number) => {
    setSelectedCommentId(commentId);
    setModifying(true);
  };
  const onCancelModify = () => {
    setModifying(false);
  };
  const onSubmitModify = (message: string) => {
    setModifying(false);
    modify({
      id: selectedCommentId!,
      articleId: id,
      message,
    });
  };

  const selectedComment = commentsQuery.data?.find(
    comment => comment.id === selectedCommentId,
  );

  // 둘 중 하나라도 준비되지 않은 데이터가 있으면 스피너 보여주기
  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;
  const isMyArticle = currentUser?.id === user.id;

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentsQuery.data}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            publishedAt={item.published_at}
            username={item.user.username}
            onRemove={onRemove}
            onModify={onModify}
            isMyComment={item.user.id === currentUser?.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <ArticleView
              title={title}
              body={body}
              publishedAt={published_at}
              username={user.username}
              id={id}
              isMyArticle={isMyArticle}
            />
            <CommentInput articleId={id} />
          </>
        }
      />
      <AskDialog
        visible={askRemoveComment}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        isDestructive
        confirmText="삭제"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
      <CommentModal
        visible={modifying}
        initialMessage={selectedComment?.message}
        onClose={onCancelModify}
        onSubmit={onSubmitModify}
      />
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

export default ArticleScreen;
