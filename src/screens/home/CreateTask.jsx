import { View } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal, TextInput, Text,useTheme, IconButton } from 'react-native-paper'
import axios from "../../utils/axiosInstance"
import { useAppContext } from '../../context/AppContext'

const CreateTask = ({setTaskChanged,taskChanged}) => {
  const theme = useTheme();
  const {token} = useAppContext()
  const [showModal,setShowModal] = useState(false);
  const [task,setTask] = useState({title:"",description:""})
  const createTask = async () => {
    await axios.post("/todos/create",task,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      }
    }
    )
    .then((res) => 
      console.log(res.data)
      )
      .catch(err => 
        console.log(err)
      )
      setShowModal(false)
      setTaskChanged(!taskChanged)
  }
  return (
    <View >
      <IconButton style={{alignSelf:'center'}} onPress={() => setShowModal(true)} mode='contained' icon="plus"/>
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
          <View style={{width:"70%",padding:16,backgroundColor:"white",borderRadius:8,alignSelf:'center'}}>
            <Text variant="headlineSmall" style={{alignSelf:'center'}}>New Task</Text>
            <View>
              <Text style={{padding:4,color:'grey'}} variant="bodyLarge">Title</Text>
              <TextInput
                onChangeText={text => setTask({...task,title:text})}
                mode="outlined"
                activeOutlineColor='green'
                style={{backgroundColor:'white',fontSize:20}}
              />
            </View>
            <View>
              <Text style={{padding:4,color:"grey"}} variant='bodyLarge'>Description</Text>
              <TextInput
                mode='outlined'
                style={{minHeight:100,backgroundColor:'white',fontSize:20}}
                activeOutlineColor='green'
                multiline={true}
                onChangeText={text => setTask({...task,description:text})}
              />
            </View>
            <Button 
            onPress={() => createTask()}
            style={{marginTop:16,width:"50%",alignSelf:'center',borderRadius:4}} mode='contained'>Save</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default CreateTask