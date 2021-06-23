export const handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!'
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }
}