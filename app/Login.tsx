import React, { useState } from 'react';
import { TextInput } from 'react-native';

const MyComponent = () => {
    const [password, setPassword] = useState<string>('')

    return (
        <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}  // <- use text (string)
            secureTextEntry
            placeholder="Password"
        />
    );
};

export default MyComponent;