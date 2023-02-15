import {  Image, View ,ToastAndroid} from "react-native"
import { Text, TextInput, Button,useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import userLogo from "../../../../assets/userLogo.jpg"
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";

const SignUp = ({navigation}) => {
    const theme = useTheme()
    const {signUp,error,setError} = useAppContext()
    const [user,setUser] = useState({name:"",email:"",password:""});
    const styles = StyleSheet.create({
        card:{
            width:"100%",
            paddingHorizontal:16,
        },
        container:{
            flex:1, 
            width:"100%", 
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#ffffff"
        }
    })
useEffect(()=>{
    if(error.error) {ToastAndroid.show(error.message, ToastAndroid.SHORT),setError({ ...error, error: false, message: "" })}
},[])

    return <View style={styles.container}>
        <View style={styles.card}>
        <View style={{alignItems:'center',paddingVertical:30}}>
            <Image style={{width:150,height:150}} source={userLogo}/>
            </View>
            <TextInput
                style={{marginVertical:16}}
                contentStyle={{backgroundColor:theme.colors.primaryContainer}}
                label="Name"
                mode="flat"
                onChangeText={text => setUser({...user,name:text})}
            />
            <TextInput 
                mode="flat"
                contentStyle={{backgroundColor:theme.colors.primaryContainer}}
                label="Email"
                onChangeText={text => setUser({...user,email:text})}
                />
            <TextInput 
                contentStyle={{backgroundColor:theme.colors.primaryContainer}}
                style={{marginVertical:16}}
                mode="flat" 
                label="password"
                onChangeText={text => setUser({...user,password:text})}
                />
            <Button onPress={() => signUp(user)} mode="contained">Sign Up</Button>
            <Button onPress={() => navigation.navigate("Login")}>Login</Button>
        </View>
    </View>
}

export default SignUp;