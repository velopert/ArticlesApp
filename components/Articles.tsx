import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Article} from '../api/types';
import ArticleItem from './ArticleItem';

export interface ArticlesProps {
  articles: Article[];
}

function Articles({articles}: ArticlesProps) {
  // TODO: renderItem 구현 예정
  return (
    <FlatList
      data={articles}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() =>
        // articles 가 1개 이상 있을 때만 최하단 테두리 보여주기
        articles.length > 0 ? <View style={styles.separator} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
});

export default Articles;
