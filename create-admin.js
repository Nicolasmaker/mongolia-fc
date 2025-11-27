const createAdmin = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/setup', {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error creando admin:', error);
    }
};

createAdmin();