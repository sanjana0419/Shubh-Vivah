import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
    // Use 10.0.2.2 for Android Emulator to access host localhost
    // For physical device, use your machine's local IP (e.g., 192.168.x.x)
    baseURL: 'http://10.0.2.2:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
