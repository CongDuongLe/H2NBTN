import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect}from 'react'
import {FontAwesome, MaterialCommunityIcons, Entypo} from '@expo/vector-icons'
import {COLORS,Items} from '../DummyData/DummyData.js'
import { SafeAreaView } from 'react-native-safe-area-context';



//Sub App Part 1 
function HeaderText(params) {
  return (
    <View style={{
      marginBottom : 5,
      paddingHorizontal : 15,
      paddingVertical : 10
    }}>
        <Text style={{
        color : COLORS.black,
        fontSize : 24,
        fontWeight : 'bold',
        letterSpacing : 1,
        lineHeight : 25,
        marginBottom : 10
      }}>Thảo Luận &amp; Đánh Giá</Text>
      <Text style={{
        fontSize : 15,
        color : COLORS.black,
        lineHeight : 25,
        opacity : 0.5
      }}>
        Hội nghe nhạc bằng tai nghe Việt Nam.
      {'\n'}FaceBook : HỘI NGHE NHẠC BẰNG TAI NGHE #H2NBTN
      </Text>
    </View>
  )
  
}
function List01({headerName,headerAvailable}) {
  return(
      <View style ={{ 
        justifyContent :'space-between', 
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 15,
        marginBottom : -10,
      }}>
        <View style={{
          paddingVertical: 18,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 18,
            color: COLORS.black,
            opacity: 1,
            fontWeight: '700',
            letterSpacing: 1
          }}>
            {headerName}
          </Text>
          <Text style={{
            fontSize: 13,
            color: COLORS.black,
            opacity: 0.5,
            fontWeight: '600',
            marginLeft: 5,
            letterSpacing: 0.8
          }}> {headerAvailable}</Text>
        </View>
        {/* Bets tai nghe duoi 1 ti */}
        {/* See all button */}
        <View>
            <Text style={{
              fontSize: 14,
              color: COLORS.blue,
              fontWeight: '600',
            }}> Show all</Text>
          </View>
      </View>
  )
}

  // MAIN APP HERE
const Home = ({navigation, route}) => {
  const [inear, setInear] = useState([])
  const [earbud, setEarbud] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', 
      () => { getDatafromDB() } 
      );
      return unsubscribe;
  }, [navigation])
  
  // lấy data từ dummy data để khởi tạo state (QUAN TRỌNG)
  const getDatafromDB = () => {
    let inearList = [];
    let earburList = [];
      for (let index = 0; index < Items.length; index++) {
        if (Items[index].category== "in-ear") {
          inearList.push(Items[index]) 
        } else if (Items[index].category== "earbud") {
          earburList.push(Items[index])
        }
      }
    setInear(inearList);
    setEarbud(earburList);
  }

  // reusable list of cart
  const ProductCart = ({ items }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Product Info', { productID: items.id })}
        style={{
          width: '44%',
          marginTop : -15,
          paddingVertical: 20,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLORS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          {items.isDiscount ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLORS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {items.discount}%
              </Text>
            </View>
          ) : null}
          <Image
            source={items.productImage}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
              borderRadius: 20,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 13,
            color: COLORS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {items.productName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {items.category == 'in-ear' ?
           (
            items.isAvailable ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name="circle"
                  style={{
                    fontSize: 12,
                    marginRight: 6,
                    color: COLORS.green,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.green,
                  }}>
                  Available
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name="circle"
                  style={{
                    fontSize: 12,
                    marginRight: 6,
                    color: COLORS.red,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.red,
                  }}>
                  No Available
                </Text>
              </View>
            )
          ) : null}
          {/* in-ear checking input value */}
          {/* earbud checking input value */}
          {
            items.category == 'earbud' ?
            (
             items.isAvailable ? (
               <View
                 style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                 }}>
                 <FontAwesome
                   name="circle"
                   style={{
                     fontSize: 12,
                     marginRight: 6,
                     color: COLORS.green,
                   }}
                 />
                 <Text
                   style={{
                     fontSize: 12,
                     color: COLORS.green,
                   }}>
                   Available
                 </Text>
               </View>
             ) : (
               <View
                 style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                 }}>
                 <FontAwesome
                   name="circle"
                   style={{
                     fontSize: 12,
                     marginRight: 6,
                     color: COLORS.red,
                   }}
                 />
                 <Text
                   style={{
                     fontSize: 12,
                     color: COLORS.red,
                   }}>
                   No Available
                 </Text>
               </View>
             )
           ) : null
          }
          <View style={{
            paddingRight: 15
          }}>
            <Text>₫ {items.price} k</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  // Header Icon
  const HeaderIcon=() => {
  return (
    <View style={{
      backgroundColor: COLORS.white,
      flex : 1
    }}> 
      <View style={{
        justifyContent : 'space-between',
        flexDirection : 'row',
        paddingHorizontal : 15,
        paddingVertical : 10 ,
        width : '100%',
      }}>
         <TouchableOpacity>
          <Entypo name= 'shopping-bag' style={{
            fontSize : 18,
            color : COLORS.backgroundMedium,
            padding : 12,
            borderRadius : 10,
            backgroundColor : COLORS.backgroundLight
          }}
          onPress={()=> navigation.navigate('Product Info')}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name= 'shopping-cart' style={{
            fontSize : 18,
            color : COLORS.backgroundMedium,
            padding : 12,
            borderRadius : 10,
            backgroundColor : COLORS.backgroundLight,
          }}
          onPress={() => navigation.navigate('My Cart')}/>
        </TouchableOpacity>
      </View> 
    </View>
  )
}
  // Main app
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderIcon />
        <HeaderText />
        <List01 headerName='Best in-ear dưới 1 tỉ' headerAvailable='16' />
        {/* In-ear map data start */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {inear.map(items => {
            return <ProductCart items={items} key={items.id} />;
          })}
        </View>
        <List01 headerName='Earbud cỏ' headerAvailable='4' />
        {/* Earbud map data start */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {earbud.map(items => {
            return <ProductCart items={items} key={items.id} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home