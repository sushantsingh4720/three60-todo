import { useEffect, useState } from "react";
import {  Image, View,ToastAndroid } from "react-native"
import {  TextInput, Button,useTheme, Portal, Modal ,Text} from "react-native-paper";
import { StyleSheet } from "react-native";
import userLogo from "../../../../assets/userLogo.jpg" 
import { useAppContext } from "../../../context/AppContext.js";
import axios  from "../../../utils/axiosInstance";

const Login = ({navigation}) => {
    const theme = useTheme();
    const {user,login,error,setError} = useAppContext();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading] = useState(false);
    const [showModal,setShowModal] = useState();

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
            backgroundColor:"#fff",
            
        }
    })
    const loginHandler=()=>{
        setLoading(true);
        login({email,password})
        setLoading(false);
    } 
    useEffect(()=>{
        if(error.error) {ToastAndroid.show(error.message, ToastAndroid.SHORT),setError({ ...error, error: false, message: "" })}
        
    },[])

    const forgetPasswordHandler = async (email) => {
        try{
        await axios.post("/user/forgotPassword",{email:email}).
        then(res => ToastAndroid.show("email sent", ToastAndroid.SHORT)).
        catch(err => console.log(err))
        }catch(error) {
            console.log("error")
        }
        setShowModal(false)
    }


    return <View style={styles.container}>
        <View style={styles.card}>
            <View style={{alignItems:'center',paddingVertical:30}}>
            <Image style={{width:150,height:150}} source={userLogo}/>
            </View>
            <TextInput 
                mode="flat"
                value={email}
                label="Email"
                contentStyle={{backgroundColor:theme.colors.primaryContainer}}
                onChangeText={text => setEmail(text)}/>
            <TextInput 
                contentStyle={{backgroundColor:theme.colors.primaryContainer}}
                style={{marginVertical:16}}
                mode="flat" 
                label="password"
                onChangeText={text=>setPassword(text)}/>
            <Button loading={loading} disabled={loading} mode="contained" onPress={loginHandler}>Login</Button>
            <Button onPress={() => navigation.navigate("SignUp")}>Register</Button>
            <Button onPress={() => setShowModal(true)}>forgot Password</Button>
        </View>
        <Portal>
            <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
                <View style={{width:'90%',alignSelf:'center',backgroundColor:'white',padding:16,borderRadius:8}}>
                <Text style={{alignSelf:'center',color:'grey'}}>We will send you reset password link on this email</Text>
                <TextInput 
                    contentStyle={{backgroundColor:theme.colors.primaryContainer}}
                    style={{marginVertical:16}}
                    mode="flat" 
                    value={email}
                    label="enter your email"
                    onChangeText={text=>setEmail(text)}
                />
                <Button onPress={() => forgetPasswordHandler(email)} mode="contained" icon="send">Send</Button>
                </View>
            </Modal>
        </Portal>
    </View>
}

export default Login;