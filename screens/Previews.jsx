import { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { Colors } from '../components/colors';
import * as ScreenOrientation from 'expo-screen-orientation';
import { VideoView, useVideoPlayer } from 'expo-video';

const videos = [
    {
        source: require('../assets/star_wars_zero_company.mp4'),
        title: 'Star Wars: Zero Company'
    },
    {
        source: require('../assets/gta_vi.mp4'),
        title: 'GTA VI'
    },
    {
        source: require('../assets/battlefield_6.mp4'),
        title: 'Battlefield 6'
    },
    {
        source: require('../assets/gow_eday.mp4'),
        title: 'Gears of War E-Day'
    },
];

const VideoPlayerItem = ({ source, title, isActive }) => {
    const player = useVideoPlayer(source, (player) => {
        player.loop = true;
        player.autoplay = isActive;
    });

    useEffect(() => {
        isActive ? player.play() : player.pause();
    }, [isActive]);

    const handleTap = () => {
        player.playing ? player.pause() : player.play();
    };

    return (
        <TouchableOpacity style={styles.videoContainer} onPress={handleTap} activeOpacity={1}>
            <VideoView
                style={styles.video}
                player={player}
                contentFit="contain"
                allowsFullscreen={false}
                allowsPictureInPicture={false}
            />
            <CustomText style={styles.videoTitle}>{title}</CustomText>
        </TouchableOpacity>
    );
};

const Previews = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        return () => ScreenOrientation.unlockAsync();
    }, []);

    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={28} color={Colors.textAccent} />
                <CustomText style={styles.backText}>Volver atrás</CustomText>
            </TouchableOpacity>

            <FlatList
                data={videos}
                renderItem={({ item, index }) => (
                    <VideoPlayerItem
                        source={item.source}
                        title={item.title}
                        isActive={index === currentIndex}
                    />
                )}
                keyExtractor={(_, i) => i.toString()}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                decelerationRate="fast"
                style={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 11,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 5,
    },
    backText: {
        fontSize: 16,
        color: Colors.textAccent,
        marginLeft: 10,
        marginRight: 10,
    },
    flatList: {
        flex: 1,
    },
    videoContainer: {
        height: Dimensions.get('window').height,
        width: '100%',
        position: 'relative',
    },
    video: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    videoTitle: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        fontSize: 24,
        color: Colors.textAccent,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default Previews;