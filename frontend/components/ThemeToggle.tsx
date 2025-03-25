import React from "react";
import { useState } from "react";
import { useColorScheme } from "react-native";

export default function ThemeToggleButton(){
    const {mode, setMode} = useColorScheme();

    const handleThemeChange = () =>{
        setMode(mode === 'light' ? 'light' : 'dark')
    }
}