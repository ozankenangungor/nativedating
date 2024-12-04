import { View, StyleSheet, Text } from 'react-native';
import { FC } from 'react';
import AvatarView from './AvatarView';
import Colors from '@/constants/Colors';
interface Props {
    name: string;
    avatar?: string;
}

const PeerProfile: FC<Props> = ({name, avatar}) => {

  return (
    <View style={styles.container}>
        <AvatarView size={45} uri={avatar}/>
        <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: Colors.primary,
    paddingLeft: 5,
    fontWeight: '600',
    fontSize: 18
  }
});

export default PeerProfile;