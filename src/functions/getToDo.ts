import { APIGatewayProxyHandler } from 'aws-lambda';
import document from 'src/utils/DynamoDBClient';

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id: user_id } = event.pathParameters;

    const toDos = await document.scan({
        TableName: 'users_todos',
        ProjectionExpression: 'user_id, title, id, done, deadline',
        // ExpressionAttributeNames: {
        //     'id': 'user_id'
        // },
        FilterExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
            ':user_id': user_id
        },

    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            todos: toDos
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }
}