import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {supabase} from './supabase';
import {launchImageLibrary} from 'react-native-image-picker';

export default function GalleryManagement({navigation}) {
  const [data, setData] = React.useState(null);
  const [updated, setUpdated] = React.useState(null);

  React.useEffect(() => {
    supabase
      .from('gallery')
      .select('*')
      .order('id', {ascending: false})
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          setData(response.data);
        }
      })
      .catch(error => {
        //console.log(error);
      });
  }, [updated]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#65a33c',
            padding: 5,
            borderRadius: 5,
            paddingHorizontal: 25,
          }}
          onPress={handleUploadGalleryImage}>
          <Text style={{color: '#f3ede1'}}>New</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function handleUploadGalleryImage() {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        const extension = uri.split('.').pop();
        const fileName = Date.now() + '.' + extension;

        const formData = new FormData();

        formData.append('file', {
          name: fileName,
          type: 'image/' + extension,
          uri: uri,
        });

        supabase.storage
          .from('gallery')
          .upload(`${fileName}`, formData)
          .then(({data, error}) => {
            if (error) {
              ToastAndroid.show(
                'Error while uploading image.',
                ToastAndroid.LONG,
              );
            } else {
              supabase
                .from('gallery')
                .insert([
                  {
                    image_name: fileName,
                  },
                ])
                .then(({data, error}) => {
                  if (error) {
                    ToastAndroid.show(
                      'Error while uploading image.',
                      ToastAndroid.LONG,
                    );
                  } else {
                    setUpdated(Date.now());
                    ToastAndroid.show(
                      'Image uploaded successfully.',
                      ToastAndroid.LONG,
                    );
                  }
                })
                .catch(err => {
                  ToastAndroid.show(
                    'Error while uploading image.',
                    ToastAndroid.LONG,
                  );
                });
            }
          })
          .catch(error => {
            ToastAndroid.show(
              'Error while uploading image.',
              ToastAndroid.LONG,
            );
          });
      }
    });
  }

  function handleDeleteImage(image_id) {
    Alert.alert('Delete Image', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          supabase
            .from('gallery')
            .delete()
            .eq('id', image_id)
            .then(() => {
              setUpdated(Date.now());
            })
            .catch(error => {
              ToastAndroid.show(
                'Error while deleting image.',
                ToastAndroid.LONG,
              );
            });
        },
      },
    ]);
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1', padding: 3}}>
      <View style={{flexDirection: 'row', margin: 5, flexWrap: 'wrap'}}>
        {data &&
          data.map(item => (
            <View
              key={'img-' + item.id}
              style={{position: 'relative', margin: 2}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  margin: 1,
                  position: 'absolute',
                  zIndex: 1,
                  padding: 5,
                  borderRadius: 100,
                }}
                onPress={() => handleDeleteImage(item.id)}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>
                  x
                </Text>
              </TouchableOpacity>
              <Image
                source={{
                  uri:
                    'https://jowjffblghcteejfsuje.supabase.co/storage/v1/object/public/gallery/' +
                    item.image_name,
                }}
                style={{width: 180, height: 180}}
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
