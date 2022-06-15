import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function KeyboardAvoidingWrapper({ children }) {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            extraHeight={180}
            enableOnAndroid={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}

export default KeyboardAvoidingWrapper;
