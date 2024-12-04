import { View, StyleSheet, Image, Pressable } from 'react-native';
import { FC } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

interface Props {
    uri?: string;
    size?: number;
    onPress?(): void;
}

const AvatarView: FC<Props> = ({size = 50, uri, onPress}) => {
  const iconContainerSize = size * 0.7;
  const iconSize = size * 0.8;

  return (
    <Pressable style={[styles.container, {width: size, height: size, borderRadius: size/2 }, !uri && styles.profileIcon]} 
    onPress={onPress}>

     {uri ? (<Image source={{uri}} style={styles.flex1}/>) : (<View style={[{width: iconContainerSize, height: iconContainerSize, borderRadius: iconContainerSize / 2 }, styles.iconContainer]}><FontAwesome name="user" size={iconSize} color={Colors.grey} /></View>)}

    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  flex1: {
    flex: 1
  },
  profileIcon: {
    backgroundColor: Colors.primary,
    alignItems:'center',
    justifyContent:'center'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
});

export default AvatarView; 
