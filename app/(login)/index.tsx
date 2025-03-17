import React, {Fragment, useState} from "react";
import {Button, StyleSheet, TextBase, TextInput, TouchableHighlight, View} from "react-native";
import {Link, Stack, useNavigation} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Label} from "@react-navigation/elements";
const listUsers = [
    {username: "user1", password: "123456"},
    {username: "user2", password: "123456"},
];
export default function Index() {
    const [userName, onChangeUserName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [wrong, setWrong] = useState<boolean>(false);
    const [isAuthen, setIsAuthen] = useState<boolean>(false);
    const navigation  = useNavigation("/(tab)");
    if (isAuthen) {
        return <View>
            <ThemedText>Login success</ThemedText>
        </View>
    }
    return     <>
        <Stack.Screen options={{ title: 'Login' }} />
        <ThemedView style={styles.container}>
            <View>
                <ThemedText style={{marginBottom: 20,fontWeight: "bold",fontSize: 20}}>
                    Login
                </ThemedText>
            </View>
            <View>
                <Label style={styles.label}>Username</Label>
                <TextInput
                    style={{...styles.input,borderColor: wrong ?  "#ff0000":"#000" }}
                    onChangeText={onChangeUserName}
                    value={userName}
                    placeholder="example@mail.com"
                    keyboardType="numeric"
                />
            </View>

            <View>
                <Label style={styles.label}>Password</Label>
                <TextInput
                    style={{...styles.input, borderColor: wrong ?   "#ff0000"  : "#000"}}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="asduseless placeholder"
                    keyboardType="numeric"
                />
            </View>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                    listUsers.forEach((u,i) =>{
                        if (userName == u.username && password == u.password) {
                            setIsAuthen(true)
                        }
                    })
                    setWrong(true)
                }}>
                <View style={styles.button}>
                    <ThemedText style={styles.buttonText}>Confirm and continue</ThemedText>
                </View>
            </TouchableHighlight>;
        </ThemedView>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        textAlign: "left",
        marginLeft: 12,

    },
    input: {
        height: 40,
        marginHorizontal: 12,
        marginVertical: 8,
        width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    button: {
        margin: 12,
        width: 300,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10,
    },
    buttonText: {
        color: "#fff",
    }
});
