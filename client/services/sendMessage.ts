import Cookies from "js-cookie";

export async function sendMessage (data: object): Promise<boolean> {
    const token = Cookies.get('jwtToken');
    try {
        if (!token) {
            throw new Error('undefined token');
        }
        const response = await fetch('http://localhost:8080/api/create-message', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return true;
        } 

    } catch (error: any) {
        console.error(error);
    }
    
    return false;
}