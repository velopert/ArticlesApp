import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

export interface CommentItemProps {
  id: number;
  message: string;
  username: string;
  publishedAt: string;
  isMyComment: boolean;
  onRemove(id: number): void;
  onModify(id: number): void;
}

function CommentItem({
  id,
  message,
  username,
  publishedAt,
  isMyComment,
  onRemove,
  onModify,
}: CommentItemProps) {
  const formattedDate = new Date(publishedAt).toDateString();

  const handleRemove = () => onRemove(id);
  const handleModify = () => onModify(id);

  return (
    <View style={styles.block}>
      <View style={styles.head}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      {isMyComment && (
        <View style={styles.actionButtons}>
          <Pressable
            style={({pressed}) => pressed && styles.pressed}
            hitSlop={8}
            onPress={handleModify}>
            <Text style={styles.buttonText}>수정</Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={({pressed}) => pressed && styles.pressed}
            hitSlop={8}
            onPress={handleRemove}>
            <Text style={styles.buttonText}>삭제</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: '#546e7a',
    fontSize: 10,
    marginTop: 4,
  },
  message: {
    marginTop: 4,
  },
  actionButtons: {
    marginTop: 24,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
  buttonText: {
    fontSize: 12,
    color: '#546e7a',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default CommentItem;
