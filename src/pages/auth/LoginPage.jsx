import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../utils/colors';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Mail, Lock, CheckSquare, Square, Chrome as Google, Facebook } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../services/authService'; // Import login service

const { width } = Dimensions.get('window');

const LoginPage = () => {
    const navigation = useNavigation();
    const [identifier, setIdentifier] = useState(''); // Renamed from email to identifier
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        let valid = true;
        let newErrors = {};

        if (!identifier) {
            newErrors.identifier = 'Mobile number or Email is required';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            setIsLoading(true);
            try {
                // Determine if identifier is phone (digits only) or email
                const isPhone = /^\d+$/.test(identifier);
                const payload = {
                    password,
                    // Send as mobile if digits, otherwise email. Backend expects 'mobile' based on error "Email or mobile required"
                    ...(isPhone ? { mobile: identifier } : { email: identifier })
                };

                // Call the actual login API
                await login(payload);

                // Navigate to Main/Home on success (assuming 'Main' is the route, adjusting if needed)
                navigation.navigate('Home');
            } catch (error) {
                // Handle login error
                console.error("Login failed", error);
                // You might want to show an alert or set a specific error state here
                alert('Login failed. Please check your credentials.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <View style={styles.mainContent}>
                        <View style={styles.logoSection}>
                            <Image
                                source={require('../../assets/common/logo_v2.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Image
                                source={require('../../assets/auth/haldi_kumkum.png')}
                                style={styles.haldiKumkum}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.formSection}>
                            <Input
                                placeholder="Email or Phone Number"
                                value={identifier}
                                onChangeText={(text) => {
                                    setIdentifier(text);
                                    setErrors({ ...errors, identifier: undefined });
                                }}
                                icon={<Mail size={20} color={Colors.subtext} />}
                                error={errors.identifier}
                            />

                            <Input
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors({ ...errors, password: undefined });
                                }}
                                icon={<Lock size={20} color={Colors.subtext} />}
                                isPassword
                                error={errors.password}
                            />

                            <TouchableOpacity style={styles.forgotPass} onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.forgotPassText}>Forgot password?</Text>
                            </TouchableOpacity>

                            <Button
                                title="Log In"
                                onPress={handleLogin}
                                isLoading={isLoading}
                                style={styles.loginBtn}
                            />

                            {/* Decorative Divider */}
                            <Image
                                source={require('../../assets/auth/landing_divider.png')}
                                style={styles.dividerImage}
                                resizeMode="contain"
                            />

                            {/* Social Login Separator */}
                            <View style={styles.socialSeparator}>
                                <View style={styles.separatorLine} />
                                <Text style={styles.separatorText}>Log In With</Text>
                                <View style={styles.separatorLine} />
                            </View>

                            {/* Social Buttons */}
                            <View style={styles.socialRow}>
                                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                                    <Google size={20} color="#DB4437" />
                                    <Text style={styles.socialBtnText}>Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                                    <Facebook size={20} color="#4267B2" />
                                    <Text style={styles.socialBtnText}>Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have any account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.signUpText}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffe4' },
    keyboardView: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingHorizontal: 30, paddingTop: 20, paddingBottom: 20 },
    mainContent: { flex: 1 },
    logoSection: { alignItems: 'center', marginBottom: 10 },
    logo: { width: width * 0.9, height: 250 },
    haldiKumkum: { width: 230, height: 110, marginTop: -60, zIndex: 10 },
    formSection: { width: '100%', marginTop: -15 },
    forgotPass: { alignSelf: 'flex-end', marginBottom: 25 },
    forgotPassText: { color: '#B71C1C', fontSize: 13, fontWeight: '600' },
    loginBtn: { marginBottom: 30, borderRadius: 30, backgroundColor: Colors.primary },
    dividerImage: { width: '100%', height: 150, alignSelf: 'center', marginTop: -40, marginBottom: 5 },
    socialSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        width: '100%',
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#757575',
        fontSize: 12,
        fontWeight: '500',
    },
    socialRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 30,
        width: '48%',
        backgroundColor: '#FFF',
    },
    socialBtnText: { marginLeft: 8, fontSize: 14, color: '#333', fontWeight: '500' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingBottom: 10 },
    footerText: { fontSize: 14, color: '#757575' },
    signUpText: { fontSize: 14, color: Colors.primary, fontWeight: '800' },
});

export default LoginPage;


