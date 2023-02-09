import { View, Text ,Pressable} from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'

const HeaderRight = ({navigation}) => {
  return (
    <Pressable onPress={() => navigation.navigate("Profile")}>
      <Avatar.Text style={{backgroundColor:'grey',marginHorizontal:16}} size={40} label='S'/>
    </Pressable>
  )
}

export default HeaderRight