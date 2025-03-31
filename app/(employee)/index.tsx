import {FlatList, TouchableOpacity, View} from "react-native";
import {Link, router, Stack, useNavigation, useRouter} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import {
    Text,
    Image,
    Modal,
    TextInput,
} from "react-native";

export interface employee {
    id: string,
    employee_name: string,
    employee_age: number,
    employee_salary:number,
    profile_image: string
}
export default function Index() {
    const [employee, setEmployee] = useState<employee[]>([])
    useEffect(()=>{
        fetch("http://blackntt.net:88/api/v1/employees").then(
            data => {
                data.json().then(
                    r => {
                        setEmployee(r)
                    }
                )
            }
        )
    },[])
    return (
        <>
            <Stack.Screen options={{title: "Employee"}}></Stack.Screen>
            <View>
                <FlatList
                    className={"p-10"}
                    data={employee} keyExtractor={(item => item.id)}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => router.push(`/(employee)/${item.id}`)}
                            className="p-4 mb-3 bg-gray-100 rounded-lg border border-gray-300 flex flex-row justify-evenly"
                        >
                            <View>
                                <Text>Id: {item.id}</Text>
                                <Text>Name: {item.employee_name}</Text>
                                <Text>Age: {item.employee_age}</Text>
                                <Text>Salary: {item.employee_salary}</Text>
                            </View>
                            <Image className={"w-32 h-32"} source={{uri: item.profile_image || "https://placehold.co/320x320/png"}}></Image>
                        </TouchableOpacity>
                    } />
            </View>
        </>

    )
}