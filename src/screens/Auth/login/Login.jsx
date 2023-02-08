import {  View } from "react-native"
import { Text,Card, TextInput, Button } from "react-native-paper";
import { StyleSheet } from "react-native";

const Login = () => {

    const styles = StyleSheet.create({
        card:{
            width:"80%",
            padding:8,
        },
        container:{
            flex:1, 
            width:"100%", 
            justifyContent:"center",
            alignItems:"center",
            
        }
    })


    return <View style={styles.container}>
        <Card style={styles.card}>
            <Text variant="headlineMedium">Login</Text>
            <TextInput 
                mode="outlined"
                label="Email"
                onChangeText={text => console.log(chutiya)}/>
            <TextInput 
            style={{marginVertical:16}}
            
            mode="outlined" label="password"/>
            <Button mode="contained">Login</Button>
        </Card>
    </View>
}

export default Login;