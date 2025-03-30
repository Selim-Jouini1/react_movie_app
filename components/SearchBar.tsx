import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface props {
    onPress?: () => void
    placeholder: string
    value?: string
    onChangeText?: (text: string) => void
}

const SearchBar = ( {onPress, placeholder, value, onChangeText}: props) => {
 
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="ab8bff"/>

        <TextInput
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor='#A8B5DB'
            className='flex-1 ml-2 text-white'>

        </TextInput>
    </View>
  )
}

export default SearchBar