import { View } from 'react-native'
import React from 'react'
import { Card,Avatar,IconButton,Text,Button } from 'react-native-paper'
import { useAppContext } from '../../context/AppContext'

const Profile = () => {

  const {logout} = useAppContext()

  return (
    <View flex={1} alignItems="center" paddingVertical={16}>
      <Card style={{width:"90%",padding:16}}>
        <View style={{ position:"absolute",right:0,top:0 }}>
            <IconButton icon="pen"/>
        </View>
    
        <Avatar.Text size={100} label='S' style={{alignSelf:'center',marginVertical:16}} />
        <View>
        <Text style={{alignSelf:'center'}} variant="headlineSmall">Shushant Singh</Text>
        </View>
      </Card>
      <View width="90%">
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton size={40} icon="email"/>
        <Text variant="titleLarge">shushant@gmail.com</Text>
        <IconButton icon="pencil"/>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton size={40} icon="instagram"/>
        <Text variant="titleLarge">shushant@insta</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton size={40} icon="linkedin"/>
        <Text variant="titleLarge">shushant@linkedIn.com</Text>
      </View>
      </View>
      <Button onPress={() => logout()} mode="contained" labelStyle={{lineHeight:40,fontSize:24,width:"80%"}}>Logout</Button>
    </View>
  )
}

export default Profile