import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {
  FormSearchType,
  OrderType,
  VideoDurationType,
  VideoType,
} from 'screen/SearchScreen';
import FilterItem from './FilterItem';
import {
  orderData,
  videoDurationData,
  videoTypeData,
} from 'constants/filter-constants';

const FilterSearch = () => {
  const visibleModalFilter = useWatch<FormSearchType>({
    name: 'visibleModalFilter',
    exact: true,
  });
  const {setValue, getValues} = useFormContext<FormSearchType>();
  const [order, setOrder] = useState<OrderType>(getValues('filter').order);
  const [type, setType] = useState<VideoType>(getValues('filter').type);
  const [videoDuration, setVideoDuration] = useState<VideoDurationType>(
    getValues('filter').videoDuration,
  );
  const handleCloseModalFilter = () => setValue('visibleModalFilter', false);
  const handleApplyFilter = () => {
    setValue('filter', {order, videoDuration, type});
    setValue('visibleModalFilter', false);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!visibleModalFilter}>
      <Pressable onPress={handleCloseModalFilter} style={styles.centeredView}>
        <Pressable style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.contentHeading}>Bộ lọc tìm kiếm</Text>
            <FilterItem
              label="Sắp xếp theo:"
              data={orderData}
              value={order}
              onChange={item => setOrder(item.key)}
            />
            <FilterItem
              label="Loại:"
              data={videoTypeData}
              value={type}
              onChange={item => setType(item.key)}
            />
            <FilterItem
              label="Ngày tải lên:"
              data={videoDurationData}
              value={videoDuration}
              onChange={item => setVideoDuration(item.key)}
            />
          </View>
          <View style={styles.modalFooter}>
            <Text
              onPress={handleCloseModalFilter}
              style={styles.modalFooterText}>
              Huỷ
            </Text>
            <Text onPress={handleApplyFilter} style={styles.modalFooterText}>
              Áp dụng
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterSearch;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    backgroundColor: '#fff',
    width: '80%',
  },
  modalContent: {padding: 20, gap: 20},
  contentHeading: {fontSize: 20, fontWeight: '500', color: '#000'},
  modalFooter: {
    padding: 20,
    justifyContent: 'flex-end',
    gap: 30,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  modalFooterText: {fontWeight: '500', fontSize: 16, color: '#1967d2'},
});
