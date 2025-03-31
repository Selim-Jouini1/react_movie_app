import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { icons } from '@/constants/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useRouter } from "expo-router";



interface MovieInfoProps {
  label: string;
  value: string | number | null;
}


const MovieInfo = ({label, value}: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
     <Text className='text-white font-normal text-sm'>
        {label}
     </Text>
     <Text className='text-white font-bold text-small mt-2'>
        {value ?? 'N/A'}
     </Text>
  </View>
)


const MovieDetails = () => {

  const router = useRouter();

  const {id} = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}> 
        <View>
            <Image 
              source = {{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
              className='w-full h-[550px]' resizeMode='stretch'
            />
        </View>
        <View className='flew-col items-startt jutify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>
            {movie?.title}
          </Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-white text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-white text-sm'>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                <Image source={icons.star} className='size-4' />
                <Text className='text-white text-sm'>{Math.round(movie?.vote_average ?? 0)} / 10</Text>
                <Text className='text-white text-sm'>({movie?.vote_count}) votes</Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview ?? 'N/A'}/>
          <MovieInfo label="Genres" value={movie?.genres?.map((genre) => genre.name).join(' - ') ?? 'N/A'}/>
          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo label="Budget" value={movie?.budget ? `$${movie.budget / 1_000_000} million` : 'N/A'} />
            <MovieInfo label="Revenue" value={movie?.revenue ? `$${Math.round(movie.revenue / 1_000_000)} million` : 'N/A'} />
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company) => company.name).join(' - ') ?? 'N/A'}/>
        </View>
      </ScrollView>
      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 ' onPress={router.back}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff" />
        <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
    </GestureHandlerRootView>
  )
}

export default MovieDetails