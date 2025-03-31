import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { employee } from "@/app/(employee)/index";

export default function EmployeeDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [editable, setEditable] = useState<boolean>(false);
    const [employee, setEmployee] = useState<employee>();
    const [tempEmployee, setTempEmployee] = useState<employee>();
    const [errors, setErrors] = useState<{ salary?: string; age?: string }>({});

    useEffect(() => {
        fetch(`http://blackntt.net:88/api/v1/employee/${id}`)
            .then(data => data.json())
            .then(r => {
                setEmployee(r);
                setTempEmployee(r);
            })
            .catch(err => console.error("Error fetching employee:", err));
    }, []);

    const handleChange = (field: keyof employee, value: string) => {
        if (tempEmployee) {
            let newErrors = { ...errors };
            let newValue: string | number = value;

            if (field === "employee_salary" || field === "employee_age") {
                // Chỉ cho phép số
                if (!/^\d*$/.test(value)) {
                    newErrors[field === "employee_salary" ? "salary" : "age"] = "Must be a number";
                    setErrors(newErrors);
                    return;
                } else {
                    newValue = value === "" ? "" : parseInt(value, 10);
                    delete newErrors[field === "employee_salary" ? "salary" : "age"];
                }

                // Validation cho age
                if (field === "employee_age" && value !== "" && parseInt(value, 10) >= 100) {
                    newErrors.age = "Age must be less than 100";
                    setErrors(newErrors);
                    return;
                }
            }

            setTempEmployee({ ...tempEmployee, [field]: newValue });
            setErrors(newErrors);
        }
    };

    const handleSave = () => {
        if (Object.keys(errors).length === 0) {
            fetch(`http://blackntt.net:88/api/v1/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tempEmployee)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update employee');
                    }
                    return response.json();
                })
                .then(() => {
                    setEmployee(tempEmployee);
                    setEditable(false);
                })
                .catch(err => {
                });
        }
    };

    const handleCancel = () => {
        setTempEmployee(employee);
        setEditable(false);
        setErrors({});
    };

    return (
        <>
            <Stack.Screen options={{
                title: `Employee ${id}`,
                headerStyle: { backgroundColor: '#f8f9fa' },
                headerTitleStyle: { fontWeight: 'bold' }
            }} />
            <View className="flex-1 bg-gray-100 p-5">
                <View className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <View className="items-center mb-4">
                        <Image
                            className="w-32 h-32 rounded-full border-4 border-blue-100"
                            source={{ uri: employee?.profile_image || "https://placehold.co/320x320/png" }}
                        />
                    </View>
                    <View className="gap-y-3">
                        <View className="flex-row items-center">
                            <Text className="w-24 text-gray-600 font-semibold">ID:</Text>
                            <TextInput
                                className={`flex-1 p-2 rounded-lg  text-gray-500 bg-gray-100`}
                                readOnly={true}
                                value={tempEmployee?.id?.toString() || ""}
                                onChangeText={(text) => handleChange("id", text)}
                            />
                        </View>
                        <View className="flex-row items-center">
                            <Text className="w-24 text-gray-600 font-semibold">Name:</Text>
                            <TextInput
                                className={`flex-1 p-2 rounded-lg ${editable ? "bg-gray-50" : "text-gray-500 bg-gray-100"}`}
                                readOnly={!editable}
                                value={tempEmployee?.employee_name || ""}
                                onChangeText={(text) => handleChange("employee_name", text)}
                            />
                        </View>
                        <View className="flex-col">
                            <View className="flex-row items-center">
                                <Text className="w-24 text-gray-600 font-semibold">Salary:</Text>
                                <TextInput
                                    className={`flex-1 p-2 rounded-lg ${editable ? "bg-gray-50" : "text-gray-500 bg-gray-100"} ${errors.salary ? "border border-red-500" : ""}`}
                                    readOnly={!editable}
                                    value={tempEmployee?.employee_salary?.toString() || ""}
                                    onChangeText={(text) => handleChange("employee_salary", text)}
                                    keyboardType="numeric"
                                />
                            </View>
                            {errors.salary && <Text className="text-red-500 text-sm ml-24">{errors.salary}</Text>}
                        </View>
                        <View className="flex-col">
                            <View className="flex-row items-center">
                                <Text className="w-24 text-gray-600 font-semibold">Age:</Text>
                                <TextInput
                                    className={`flex-1 p-2 rounded-lg ${editable ? "bg-gray-50" : "text-gray-500 bg-gray-100"} ${errors.age ? "border border-red-500" : ""}`}
                                    readOnly={!editable}
                                    value={tempEmployee?.employee_age?.toString() || ""}
                                    onChangeText={(text) => handleChange("employee_age", text)}
                                    keyboardType="numeric"
                                />
                            </View>
                            {errors.age && <Text className="text-red-500 text-sm ml-24">{errors.age}</Text>}
                        </View>
                        {
                            editable &&
                            <View className="flex-col">
                                <View className="flex-row items-center">
                                    <Text className="w-24 text-gray-600 font-semibold">Image:</Text>
                                    <TextInput
                                        className={`flex-1 p-2 rounded-lg ${editable ? "bg-gray-50" : "text-gray-500 bg-gray-100"}`}
                                        readOnly={!editable}
                                        value={tempEmployee?.profile_image?.toString() || ""}
                                        onChangeText={(text) => handleChange("profile_image", text)}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        }

                    </View>
                </View>
                <View className="flex-row justify-between">
                    <TouchableOpacity
                        className="flex-1 mr-2 bg-blue-500 p-4 rounded-xl items-center shadow-md active:bg-blue-600"
                        onPress={() => setEditable(true)}
                    >
                        <Text className="text-white font-bold text-lg">Edit</Text>
                    </TouchableOpacity>
                    {editable && (
                        <>
                            <TouchableOpacity
                                className="flex-1 mx-2 bg-green-500 p-4 rounded-xl items-center shadow-md active:bg-green-600"
                                onPress={handleSave}
                                disabled={Object.keys(errors).length > 0}
                            >
                                <Text className="text-white font-bold text-lg">Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 ml-2 bg-red-500 p-4 rounded-xl items-center shadow-md active:bg-red-600"
                                onPress={handleCancel}
                            >
                                <Text className="text-white font-bold text-lg">Cancel</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </>
    );
}