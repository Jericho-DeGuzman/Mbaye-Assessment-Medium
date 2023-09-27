import Cookies from "js-cookie";

export function retrieveMessages (data: object): Promise<[]> {
    return new Promise (async (resolve, reject) => {
        try {
            const response = await fetch ('http://Localhost:8080/api/messages', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const result = await response.json()
                const {messages, token} = result;
                Cookies.set('jwtToken', token);
                
                resolve(messages);
            }   

        } catch (error: any) {
            reject(error?.message);
        }
    })
}