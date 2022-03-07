import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList, 
  Animated
} from 'react-native';
import React,{useState, useEffect} from 'react'
import {COLORS, Items} from '../DummyData/DummyData'
import { SafeAreaView } from 'react-native-safe-area-context';
import {FontAwesome, Ionicons, Entypo} from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';




const ProductInfo = ({route, navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);


  const {productID} = route.params; // productID from reusable card component of Home.js

  const [product, setProduct] = useState({})
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', 
      () => { getDatafromDB() } 
      );
      return unsubscribe;
  }, [navigation])

  //get product data from productID
  const getDatafromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id== productID){
        await setProduct(Items[index])
        return;
      }  
    }
  }
  
  
// render Product Image Slider
const Slider= () => {
  // render flatlist Imagelist
  const renderImageList = ({ item, index }) => {
    return (
      <View
      style={{
        width: width,
        height: height*0.4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop : 12,
        paddingHorizontal : 12
      }}>
      <Image
        source={item}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
          borderRadius: 10,
         
        }}
      />
    </View>
    )
  }
  return (
        <View style={{
          width: '100%',
          position: 'relative',
          backgroundColor: COLORS.backgroundLight,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            justifyContent : 'space-between',
            width: '100%',
            flexDirection: 'row',
            paddingTop: 12,
            paddingLeft: 12,
          }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
               style={{paddingRight : 14}}
               onPress={() =>  navigation.navigate('My Cart')}>
            <AntDesign name="star" 
            style={{
                  fontSize: 18,
                  color: COLORS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                }} />
            </TouchableOpacity>  
          </View>
         <FlatList data={product.productImageList ? product.productImageList : null }
          horizontal
          renderItem={renderImageList}
          showsHorizontalScrollIndicator = {false}
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          decelerationRate={0.8}
          snapToInterval={width}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
         />
          <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop : 15,
            marginBottom : 8
          }}>
           {product.productImageList
              ? product.productImageList.map((item, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: COLORS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}></Animated.View>
                  );
                })
              : null}
              </View>
        </View>
      )
    }
  
// render Product Info
  const ProductInfo = () => {
    return (
      <View>
        <View style={{
          marginTop: 20,
          width: '100%',
          paddingHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.black,
            paddingHorizontal: 8,
            paddingVertical: 8,

          }}>
            {product.productName}
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLORS.blue,
                backgroundColor: COLORS.blue + 10,
                padding: 12,
                borderRadius: 100,
                marginRight: 12
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
// render Product Description
  const ProductDescription = () => {
    return (
      <View style={{
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 12,
      }}>
        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          paddingHorizontal: 8,
          paddingVertical: 8,
          opacity: 0.5,
          letterSpacing: 1,
          lineHeight: 24,
          maxHeight: height * 0.3,
        }}>
          {product.description ? product.description : null}
        </Text>
      </View>
    )
  }
 // render Shipping Info
  const ShippingInfo = () => {
    return (
      <View style={{
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 12,
      }}>
        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          paddingHorizontal: 8,
          fontWeight: '800',
          opacity: 0.7,
        }}>
          Shipping To
        </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 14,
          borderBottomColor: COLORS.backgroundLight,
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center',
          }}>
          <View
            style={{
              color: COLORS.blue,
              backgroundColor: COLORS.backgroundLight,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              borderRadius: 100,
              marginRight: 10,
              paddingHorizontal: 12,
            }}>
            <Entypo
              name="location-pin"
              style={{
                fontSize: 18,
                color: COLORS.blue,
              }}
            />
          </View>
          <Text style={{
            fontSize: 15,
            lineHeight: 20,
            color: COLORS.black,
            fontWeight: 'bold',
            alignItems: 'center',
            opacity: 0.7,
          }}> Cau Giay, Ha Noi{'\n'} Viet Nam</Text>
        </View>
        <TouchableOpacity>
          <Entypo
            name="chevron-right"
            style={{
              fontSize: 22,
              color: COLORS.backgroundDark,
            }}
          />
        </TouchableOpacity>
      </View>
      </View>
    )
  }
//render Total Product Price
  const TotalProductPrice = () => {
    return(
      <View
      style={{
        paddingHorizontal: 16,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          maxWidth: '85%',
          color: COLORS.black,
          marginBottom: 4,
        }}>
        ₫ {product.price}.000
      </Text>
      <Text>
        Tax Rate 2%~ ₫{product.price / 20} (₫{product.price} x 2%)
      </Text>
    </View>
    )
  }
// render Button Buy
  const ButtonBuy = () => {
    // is touching or not
    const [isTouching, setIsTouching] = useState(false);
    // set state for heart icon
    return (
      <View style={{
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity style={{
          backgroundColor: product.isAvailable ? COLORS.blue : COLORS.backgroundLight,
          padding: 14,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginRight: 12,
          marginBottom: 12
        }}>
          {/* check product is available ? then do some action */}
          <AntDesign
            name="shoppingcart" size={24} color={product.isAvailable ? COLORS.white : COLORS.black}
          />
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: product.isAvailable ? COLORS.white : COLORS.black,
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}>
            {product.isAvailable ? 'Add to Cart' : 'Sold Out'}
          </Text>
        </TouchableOpacity>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginLeft: 12,
          marginBottom: 12,
          borderRadius: 100,
        }}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
            onPress={() => setIsTouching(!isTouching)}
          >
            <FontAwesome
              name="heart-o"
              style={{
                fontSize: 24,
                color: isTouching ? COLORS.red : COLORS.back,
                padding: 12,
                borderRadius: 100,
                marginRight: 12,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
    // Main Product Info
  return (
    <SafeAreaView style={{ 
      flex: 1,
      backgroundColor: COLORS.white,
      position: 'relative',

    }}>
      <StatusBar backgroundColor={COLORS.backgroundLight} barStyle='dark-content' />
      <ScrollView>
        {/* Product Image Slider */}
        <Slider/>
        {/* Product Info */}
        <ProductInfo/>
        {/* Product Description */}
        <ProductDescription/>
        {/* Shipping Info */}
        <ShippingInfo/>
        {/* Total Product Price */}
        <TotalProductPrice/>
      </ScrollView>
      {/* Button Buy */}
      <ButtonBuy/>
    </SafeAreaView>
  )
}

export default ProductInfo