import {View,StyleSheet, Pressable, Text, TouchableOpacity} from 'react-native'
import {FC} from 'react';
import colors from '@/constants/Colors';
interface Props {
    leftTitle: string;
    rightTile: string;
    onLeftPress(): void;
    onRightPress(): void;
}


const FormNavigator: FC<Props> = ({leftTitle, rightTile, onLeftPress, onRightPress}) => {
  return (
    <View style={styles.container} > 
    <TouchableOpacity onPress={onLeftPress} >
    <Text style={styles.title}>{leftTitle}</Text>
    </TouchableOpacity>
     </View>

  );
};


const styles = StyleSheet.create({
container: { 
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingHorizontal:50
 },
 title:{
    color: colors.dark1, 
    marginHorizontal:10,
    fontFamily:'mon-sb',
    fontWeight:'500'

 }

});

export default FormNavigator;