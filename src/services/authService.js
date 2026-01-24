import api from './api';

// Auth related API calls
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    // Keeping this placeholder but modifying if needed, currently not in user request scope but good to have
    // Assuming register might map to something else later, or just leaving as TODO
    // For now, I will implement the requested methods
};

export const sendOtp = async (authDto) => {
    try {
        const response = await api.post('/auth/send-otp', authDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyOtp = async (authDto) => {
    try {
        const response = await api.post('/auth/verify-otp', authDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const setPassword = async (authDto) => {
    try {
        const response = await api.post('/auth/set-password', authDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};
