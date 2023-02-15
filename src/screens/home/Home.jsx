import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SingleTodo from './SingleTodo'
import axios from "../../utils/axiosInstance"
import { useAppContext } from '../../context/AppContext'
import CreateTask from './CreateTask'

const Home = () => {

  const {token} = useAppContext()
  const [todos,setTodos] = useState([]);
  const [taskChanged,setTaskChanged] = useState();

  const getAllTodos = async () => {
    try {
      await axios.get("/todos",{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      setTodos(res.data.todos)
      // console.log(res.data.todos)
    }
      )
    .catch(err => 
      console.log(err.response.data)
    )
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllTodos()
  },[taskChanged])

  return (
    <View padding={8}>
      <FlatList
      data={todos}
      renderItem={ ({item}) => {
        return(
          <SingleTodo setTaskChanged={setTaskChanged} taskChanged={taskChanged} item={item}/>
        )
      }}
      keyExtractor={item => item._id}
      numColumns={2}
      ListHeaderComponent={<CreateTask setTaskChanged={setTaskChanged} taskChanged={taskChanged}/>}
      columnWrapperStyle={{
        flexWrap:'wrap'
      }}
      />
    </View>
  )
}

export default Home