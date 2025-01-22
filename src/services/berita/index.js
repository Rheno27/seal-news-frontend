export const getBeritaTerbaru = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/terbaru`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};

export const getBeritaEkonomi = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/ekonomi`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};

export const getBeritaTeknologi = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/teknologi`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};  

export const getBeritaHiburan = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/hiburan`, {
            method: 'GET',
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return result?.data;
};

export const getBeritaGayaHidup = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/gayaHidup`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};

export const getBeritaOlahraga = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/olahraga`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};

export const getBeritaNasional = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/nasional`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};

export const getBeritaInternasional = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cnn/internasional`, {
        method: 'GET',
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return result?.data;
};
