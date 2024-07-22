import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {adjustments_vertical, magnifying_glass} from 'icons';
import {useFormContext} from 'react-hook-form';
import {FormSearchType} from '@screen/SearchScreen';

const SEARCH_BAR_HEIGHT = 45;
const SearchBar = () => {
  const {setValue} = useFormContext<FormSearchType>();
  const [query, setQuery] = useState('');
  const handleSearch = () => setValue('searchTerm', query);
  const handleOpenModalFilter = () => setValue('visibleModalFilter', true);
  return (
    <View style={styles.search_bar_container}>
      <View style={styles.search_bar}>
        <TextInput
          style={styles.search_input}
          cursorColor={'#000'}
          autoFocus
          placeholder="Tìm kiếm..."
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Pressable style={styles.search_button} onPress={handleSearch}>
          <SvgXml
            xml={magnifying_glass}
            color={'#fff'}
            width={22}
            height={22}
          />
        </Pressable>
      </View>
      <Pressable onPress={handleOpenModalFilter} style={styles.search_filter}>
        <SvgXml
          xml={adjustments_vertical}
          color={'#000'}
          width={22}
          height={22}
        />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  search_bar_container: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  search_input: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    height: SEARCH_BAR_HEIGHT,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 45,
  },
  search_button: {
    width: SEARCH_BAR_HEIGHT - 10,
    aspectRatio: 1,
    backgroundColor: '#f50202',
    borderRadius: 20,
    position: 'absolute',
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_filter: {
    width: SEARCH_BAR_HEIGHT,
    aspectRatio: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
