import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "@/components/SearchBar"
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies, 
    loading:trendingMoviesLoading, 
    error:trendingMoviesError
  }= useFetch(getTrendingMovies)


  const {
    data: movies, 
    loading:moviesLoading, 
    error:moviesError
  } = useFetch(() => fetchMovies({ 
    query: '' }))

  //console.log(movies)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View className="flex-1 bg-primary">

      <Image source={images.bg} className="w-full absolute z-0" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator 
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ): moviesError || trendingMoviesError ? (
          <Text className="text-white text-center mt-10"> Error: {moviesError?.message || trendingMoviesError?.message}</Text>
        ): 
          <View className="flex-1 mt-5" >
          <SearchBar 
            onPress={() => {router.push("/search")}}
            placeholder='Search for a movie'
          />

          {trendingMovies && (
            <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                </Text>
            </View>
          )}
          <>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-4" />}
            keyExtractor={(item) => item.movie_id.toString()}
            data={trendingMovies}
            renderItem={({ item, index}) => (
              <TrendingCard movie = {item} index={index}/>
              )
            }

          />
          <Text className="text-lg text-white mt-5 mb-3 font-bold">Latest Movies</Text>
          <FlatList
            key={movies?.results?.length > 0 ? 'grid' : 'list'} // Force re-render when data changes
            data={movies?.results || []}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10
             }}
             className="mt-2 pb-32"
             scrollEnabled={false}
            renderItem={({ item }) => (
              <MovieCard 

                {...item}

              />
            )}
            ListEmptyComponent={<Text className="text-white text-sm">No movies found</Text>}
          />

          </>
        </View>
        
        }

      </ScrollView>

    </View>
    </GestureHandlerRootView>
  );
}
