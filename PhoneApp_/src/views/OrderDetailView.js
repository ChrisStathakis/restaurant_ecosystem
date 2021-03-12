import React  from 'react';
import { Button, View, Text } from 'react-native';


function OrderDetailView({ route, navigation }) {
    const { itemId, title } = route.params;
    return (
        <View style={{ flex: 1, alignItems:'center', justifyContent: "center"}}>
            <Text>ItemId: {JSON.stringify(itemId)}</Text>
            <Text>Title: {JSON.stringify(title)}</Text>
            <Button
                title="Back"
                onPress={()=>navigation.push('Home')}
                />
        </View>
    )
};

export default OrderDetailView;