import { View ,StyleSheet, Pressable} from 'react-native'
import React, { useState } from 'react'
import { Button, IconButton, Modal, Portal, Text ,TextInput,useTheme} from 'react-native-paper'
import axios from "../../utils/axiosInstance"
import { useAppContext } from '../../context/AppContext'


const SingleTodo = ({item,taskChanged,setTaskChanged}) => {
  const [showDescription,setShowDescription] = useState(false);
  const [task,setTask] = useState({title:item.title,description:item.description});
  const [showModal,setShowModal] = useState(false);
  const [showDeleteModeel,setShowDeleteModeel] = useState(false);
  const {token} = useAppContext();
  const theme = useTheme()
  const styles=StyleSheet.create({
    title:{
      fontSize:30
    },
    month:
    {
      fontSize:20,
      marginTop:12
    },
    container:{
      width:"95%",
      margin:8,
      padding:16,
      backgroundColor:"white",
      borderRadius:16,
      elevation:9
    }
  })

  const updateTask = async () => {
    await axios.put(`/todos/update/${item._id}`,task,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      }
    }).then((res) => {
      setTaskChanged(!taskChanged)
      setShowModal(false)} )
      .catch(err => console.log(err))
   
  }

  const deleteTask = async () => {
    
    await axios.delete(`/todos/delete/${item._id}`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      }
    }).then((res) =>{setTaskChanged(!taskChanged)
       setShowDeleteModeel(false)} ).catch(err => console.log(err))
    
  }

  return (
    <View style={{width:'50%'}}>
    <View style={styles.container}>
      <Pressable onPress={() => setShowDescription(!showDescription)}>
            
            <Text style={styles.title}>{item.title}</Text>
            {showDescription &&
            <Text>{item.description}</Text>
            }
            <Text style={styles.month} >{new Date(item.createdAt).toDateString('en-GB')}</Text>
            {showDescription && 
              <View flexDirection="row" alignItems="center" justifyContent="space-between">
                <IconButton onPress={() => setShowModal(true)} icon="pencil"/>
                <IconButton onPress={() => setShowDeleteModeel(true)} icon="delete"/>
              </View>
            }
    </Pressable>
    <Portal>
      <Modal visible={showDeleteModeel} onDismiss={()=>setShowDeleteModeel(false)}>
        <View style={{width:"70%",padding:16,backgroundColor:"white",borderRadius:8,alignSelf:'center'}}>
          <Text style={{fontSize:18}}>Are you sure you want to delete this task</Text>
          <View style={{marginTop:32, flexDirection:"row" ,justifyContent:"space-between" }}>
          <Button 
            onPress={() => setShowDeleteModeel(false)}
            style={{width:"40%",alignSelf:'center',borderRadius:4}} mode='contained'>No</Button>
          <Button 
            onPress={() => deleteTask()}
            style={{width:"40%",alignSelf:'center',borderRadius:4}} mode='contained'>yes</Button>
            </View>
        </View>

      </Modal>
    </Portal>
    <Portal>
      <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
      <View style={{width:"70%",padding:16,backgroundColor:"white",borderRadius:8,alignSelf:'center'}}>
            <Text variant="headlineSmall" style={{alignSelf:'center'}}>Update Task</Text>
            <View>
              <Text style={{padding:4,color:'grey'}} variant="bodyLarge">Title</Text>
              <TextInput
                value={task.title}
                onChangeText={text => setTask({...task,title:text})}
                mode="outlined"
                activeOutlineColor='green'
                style={{backgroundColor:'white',fontSize:20}}
              />
            </View>
            <View>
              <Text style={{padding:4,color:"grey"}} variant='bodyLarge'>Description</Text>
              <TextInput
                value={task.description}
                mode='outlined'
                style={{minHeight:100,backgroundColor:'white',fontSize:20}}
                activeOutlineColor='green'
                multiline={true}
                onChangeText={text => setTask({...task,description:text})}
              />
            </View>
            <Button 
            onPress={() => updateTask()}
            style={{marginTop:16,width:"50%",alignSelf:'center',borderRadius:4}} mode='contained'>Update</Button>
          </View>
      </Modal>
    </Portal>
    </View>
    </View>
  )
}


export default SingleTodo