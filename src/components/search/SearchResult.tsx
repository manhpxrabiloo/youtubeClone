import {FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {useWatch} from 'react-hook-form';
import {FilterType, FormSearchType} from '../../screen/SearchScreen';
import SearchResultItem from './SearchResultItem';
import useSearchVideo from '@hooks/useSearchVideo';

const SearchResult = () => {
  const searchTerm = useWatch<Pick<FormSearchType, 'searchTerm'>>({
    name: 'searchTerm',
    exact: true,
  });
  const filter: FilterType = useWatch({
    name: 'filter',
    exact: true,
  });
  const {
    data: resultSearch,
    isLoading,
    refetch,
  } = useSearchVideo(searchTerm, filter);
  return (
    <FlatList
      data={resultSearch ?? []}
      keyExtractor={({id}, index) => `${JSON.stringify(id)}-${index}`}
      windowSize={21}
      initialNumToRender={10}
      bounces={false}
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <SearchResultItem data={item} />}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          progressViewOffset={40}
        />
      }
    />
  );
};

export default SearchResult;
