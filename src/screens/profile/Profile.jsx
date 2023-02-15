import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card,Avatar,IconButton,Text,Button ,Portal,Modal,TextInput} from 'react-native-paper'
import { useAppContext } from '../../context/AppContext'
import axios from "../../utils/axiosInstance";
const Profile = () => {
  const [user,setUser]=useState({})
  const {logout,token} = useAppContext()
  const [showModal,setShowModel]=useState(false)
  const [data,setData]=useState({name:user.name,password:""})
   const getUserDeatails=async()=>{
    try {
      await axios
        .get("/user/profile",{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          
          setUser(res.data.user);
        
        })
        .catch((err) =>
         console.log(err)
        );
    } catch (error) {
      console.log(error);
    }
   }
   const changeProfileHandler=async()=>{
    console.log(data)
    try {
      await axios
        .put("/user/profile/updateprofile",data,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          console.log(res.data.user)
          setUser(res.data.user);
          setShowModel(false)
        
        })
        .catch((err) =>
         console.log(err)
        );
    } catch (error) {
      console.log(error);
    }
   }
   useEffect(()=>{
    getUserDeatails()
   },[user])
  return (
    <View flex={1} alignItems="center" paddingVertical={16}>
      <Card style={{width:"90%",padding:16}}>
        <View style={{ position:"absolute",right:0,top:0 }}>
            <IconButton icon="pen" onPress={()=>{setShowModel(true)}}/>
        </View>
    
        <Avatar.Text size={100} label={user.name?user.name[0].toUpperCase():""} style={{alignSelf:'center',marginVertical:16}} />
        <View>
        <Text style={{alignSelf:'center'}} variant="headlineSmall">{user.name}</Text>
        </View>
      </Card>
      <View width="90%" >
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between",width:"100%"}}>
        <View style={{flexDirection:"row",alignItems:'center',width:"100%" ,}}>
          <View width="20%">
        <IconButton  size={40} icon="email"/>
        </View>
        <View style={{width:"80%"}} >
        <Text  style={{width:"100%"}}>{user.email}</Text>
        </View>
        </View>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',}}>
        <IconButton size={40} icon="instagram"/>
        <Text variant="titleLarge">Facebook</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton size={40} icon="linkedin"/>
        <Text variant="titleLarge">linkedin</Text>
      </View>
      </View>
      <Button onPress={() => logout()} mode="contained" labelStyle={{lineHeight:40,fontSize:24,width:"80%"}}>Logout</Button>
      <Portal>
      <Modal visible={showModal} onDismiss={()=>setShowModel(false)} >
      <View style={{width:"70%",padding:16,backgroundColor:"white",borderRadius:8,alignSelf:'center'}}>
            <Text variant="headlineSmall" style={{alignSelf:'center'}}>Update Profile</Text>
            <View>
              <Text style={{padding:4,color:'grey'}} variant="bodyLarge">Name</Text>
              <TextInput
                value={data.name}
                onChangeText={text => setData({...data,name:text})}
                mode="outlined"
                underlineColorAndroid='transparent'
                activeOutlineColor='green'
                style={{backgroundColor:'white',fontSize:20}}
              />
            </View>
            <View>
              <Text style={{padding:4,color:"grey"}} variant='bodyLarge'>Change Passowrd (optional)</Text>
              <TextInput
                placeholder='New Passowrd'
                secureTextEntry={true}
                onChangeText={text=>setData({...data,password:text})}
                mode='outlined'
                style={{backgroundColor:'white',fontSize:20}}
                activeOutlineColor='green'
              />
            </View>
            <Button 
            onPress={()=>changeProfileHandler()}
            style={{marginTop:16,width:"50%",alignSelf:'center',borderRadius:4}} mode='contained'>Update</Button>
          </View>
      </Modal>
    </Portal>
    </View>
  )
}

export default Profile