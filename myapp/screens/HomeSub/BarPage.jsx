import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchBarsData } from '../../utile/api'
   import { colors } from '../../utile/colors';


const Barpage = ({ route, navigation }) => {

const { markerData } = route.params;
    const barName = markerData.title
    
    const [data, setData] = useState([]);
    const [Show, setShow]=useState(false)

    useEffect(() => {
    const fetchData = async () => {
        try {
            const filteredData = await fetchBarsData();
            const BarInfo = filteredData.filter((bar) => bar.name === barName);
            setData(BarInfo);
        } catch (error) {
            console.error('Error fetching data in Barpage:', error);
        }
    };
    fetchData(); 
}, []);


    if (!data || Object.keys(data).length === 0) {
        return (
            <View style={styles.loadingContainer}>
               <ActivityIndicator size="large" color={colors.Radiance} />
            </View>
        );
    }

    const {
        adresse,
        horaires,
        image,
        name,
        note,
        numero,
        presentation,
        type,
    
    } = data[0];


    function goToBars() {
        navigation.navigate('Carte')
    }
    

function hundleDetails() {
setShow(!Show)
}

return (
    <ScrollView style={styles.container}>
        <View>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
        </View>

        <TouchableOpacity style={styles.icon} onPress={goToBars}>
            <FontAwesome style={{ padding: 10 }} name="arrow-left" size={25} color={colors.DeepBlue} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
        <View style={styles.barNote}>
                {[...Array(Math.floor(note))].map((_, index) => (
                    <FontAwesome
                        key={index}
                        style={{ padding: 1 }}
                        name="star"
                        size={20}
                        color={colors.GoldenYellow}
                    />
                ))}
        </View>
            
            <Text style={styles.barName}>{name}</Text>
            <Text style={styles.baradresse}>{adresse}</Text>
            <Text style={styles.barsNum}>
            {numero === 'true' || numero === 'false' ? 'Pas de numéro' : numero}
            </Text>
            <Text style={styles.barsType}>Type : {type}</Text>
            <Text style={styles.barspresent}>Présentation : {presentation}.</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>


                <View style={{width:'100%', }}>

                    <Text style={{paddingVertical:10, fontSize:16, fontWeight:'bold',fontSize: 16,}} onPress={hundleDetails}>Voir Horaires ↴</Text>
                    
 {Show&&<View style={styles.horaires}>

            {Object.entries(horaires).map(([day, hours]) => (
            <Text key={day}>{`${day.charAt(0).toUpperCase() +  day.slice(1)}: ${ hours}`}</Text>
            ))}
            </View>}



                </View>


         
                
           


            <TouchableOpacity
            style={styles.btn}
         
            >
                <FontAwesome
                style={{ padding: 10 }}
                name="heart"
                size={20}
                color={colors.Radiance}
                /> 

                <Text style={styles.btnText}>
                Favoris
                </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    </ScrollView>
);

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
                },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 260,
    },
    textContainer: {
        padding: 26,

    },
    barNote: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        fontSize: 15,
        color: 'gray',
        

    },
    barName: {
        fontSize: 20,
        fontFamily: 'BricolageGrotesque',
        marginVertical: 10,
        
    },
    baradresse: {
        fontSize: 12,
        marginVertical: 10,
        color: 'gray',
        fontFamily: 'Poppins-Regular' ,
        
        

    },
    barsNum: {
        fontSize: 15,
        marginVertical: 10,
        fontFamily: 'Poppins-Regular' ,

    },
    barspresent: {
        marginVertical:10,
        fontSize:15,
        textAlign: 'justify',
        fontFamily: 'Poppins-Regular' ,

        
    },
    barsType: {
        fontSize: 15,
        // color: colors.GoldenYellow,
        fontFamily: 'Poppins-Regular' ,

        
    }, icon: {
        top: 50, 
        left:10,
        backgroundColor: colors.GoldenYellow,
        position: 'absolute',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        fontFamily: 'Poppins-Regular' ,

    },
    
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 28,
        paddingVertical:8,
        backgroundColor: colors.GoldenYellow,
        borderRadius: 30,
        width: 150,
        alignItems: 'center',
        marginTop: 40,
    },
    btnText: {
        fontFamily: 'BricolageGrotesque',
        fontSize: 18,
        color: colors.DeepBlue,
        marginRight:30,


    }, horaires: {
        width: '100%',
        height:130,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 20,
        fontFamily: 'Poppins-Regular',

        
    },
    showBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.GoldenYellow,
        borderRadius: 30,
        width: 150,
        alignItems: 'center',
        marginTop: 40,
    }
});

export default Barpage;
