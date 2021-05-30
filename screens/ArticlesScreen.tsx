import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {getArticles} from '../api/articles';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';

function ArticlesScreen() {
  const {data} = useQuery('articles', getArticles);
  const [user] = useUserState();

  if (!data) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  return <Articles articles={data} showWriteButton={!!user} />;
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticlesScreen;
