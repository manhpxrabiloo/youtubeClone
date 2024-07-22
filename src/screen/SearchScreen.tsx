import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import FilterSearch from 'components/search/FilterSearch';
import SearchResult from '../components/search/SearchResult';
import SearchBar from 'components/search/SearchBar';

export type OrderType = 'relevance' | 'date' | 'viewCount' | 'rating';
export type VideoType = 'all' | 'channel' | 'playlist' | 'video';
export type VideoDurationType = 'any' | 'long' | 'medium' | 'short';
export type FilterType = {
  order: OrderType;
  type: VideoType;
  videoDuration: VideoDurationType;
};

export type FormSearchType = {
  searchTerm: string;
  visibleModalFilter: boolean;
  filter: FilterType;
};

const SearchScreen = () => {
  const methods = useForm<FormSearchType>({
    defaultValues: {
      searchTerm: '',
      visibleModalFilter: false,
      filter: {
        order: 'relevance',
        type: 'all',
        videoDuration: 'any',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <SearchBar />
        <SearchResult />
        <FilterSearch />
      </View>
    </FormProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});
