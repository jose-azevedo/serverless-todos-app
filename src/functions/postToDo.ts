import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import document from 'src/utils/DynamoDBClient';

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id: user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body);

    const toDo = {
        id: uuidv4(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline).toDateString()
    }

    await document.put({
        TableName: 'users_todos',
        Item: { ...toDo }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Created!',
            toDo 
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }
}