import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const LanguageSelectionPage = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const languages = [
        { id: 'en', label: 'English', native: 'English' },
        { id: 'hi', label: 'हिंदी', native: 'Hindi' },
        { id: 'mr', label: 'मराठी', native: 'Marathi' },
    ];

    const handleContinue = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainContent}>
                        {/* Unified Logo & Image Block */}
                        <View style={styles.brandingContainer}>
                            <View style={styles.logoWrapper}>
                                <Image
                                    source={require('../../assets/common/logo_v2.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>
                            <Image
                                source={require('../../assets/auth/haldi_kumkum.png')}
                                style={styles.haldiKumkum}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Header Text */}
                        <View style={styles.header}>
                            <Text style={styles.title}>Choose your preferred Language</Text>
                            <Text style={styles.subtitle}>Please select your language</Text>
                        </View>

                        {/* Language Selection List */}
                        <View style={styles.listContainer}>
                            {languages.map((item) => {
                                const isSelected = selectedLanguage === item.id;
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.languageCard}
                                        onPress={() => setSelectedLanguage(item.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.radioButton,
                                            isSelected && styles.radioButtonSelected
                                        ]}>
                                            {isSelected && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={[
                                            styles.languageLabel,
                                            isSelected && styles.languageLabelSelected
                                        ]}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Footer Section - Pushed to bottom by flex: 1 in mainContent */}
                    <View style={styles.footer}>
                        <Image
                            source={require('../../assets/auth/landing_divider.png')}
                            style={styles.dividerImage}
                            resizeMode="contain"
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleContinue}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Save & Continue</Text>
                        </TouchableOpacity>
                        <View style={styles.bottomBar} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffe4',
    },
    scrollContent: {
        flexGrow: 1, // Crucial: allows inner content to fill screen
    },
    mainContent: {
        flex: 1, // Crucial: pushes footer down on large screens
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    brandingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02,
        marginBottom: 10,
    },
    logoWrapper: {
        zIndex: 2,
    },
    logo: {
        width: width * 0.9,
        height: 220, // Reduced from 250
    },
    haldiKumkum: {
        width: 260,
        height: 120,
        marginTop: -75, // Pull further up
        zIndex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 10, // Reduced
        width: '100%',
        marginTop: -20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5, // Reduced
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 10, // Reduced
    },
    listContainer: {
        width: '100%',
        paddingHorizontal: 4,
    },
    languageCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12, // Reduced from 15
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    languageLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        marginLeft: 15,
    },
    languageLabelSelected: {
        color: '#000',
        fontWeight: '600',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#BDBDBD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: Colors.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        width: '100%',
        alignItems: 'center',
        marginTop: 'auto', // Pushes to bottom if flex exists
    },
    dividerImage: {
        width: '100%',
        height: 150, // Increased size
        marginTop: -60, // Moved more upwards
        marginBottom: 5,
    },
    button: {
        width: '100%',
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    bottomBar: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        marginTop: 20,
    },
});

export default LanguageSelectionPage;
