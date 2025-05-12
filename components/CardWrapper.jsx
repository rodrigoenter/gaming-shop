import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../components/colors';

const CardWrapper = ({ children, onPress }) => {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.contentContainer}>
                {children}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.background,
        borderRadius: 16,
        margin: 16,
        borderWidth: 2,
        borderColor: Colors.border,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    contentContainer: {
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
    }
});

export default CardWrapper;
