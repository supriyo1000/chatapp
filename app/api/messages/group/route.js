import { NextResponse } from 'next/server';
import dbconnection from '../../../dbconnection';

export async function GET(request) {
    try {
        // Parse query parameters from the request
        const url = new URL(request.url);
        const fromUserId = url.searchParams.get('fromuserid');
        const roomId = url.searchParams.get('touserid');
        const currentMsgId = url.searchParams.get('currentmsgid');

        console.log(fromUserId, roomId, currentMsgId);
        // console.log(typeof (fromUserId), typeof (toUserId), typeof (currentMsgId));



        // Ensure the parameters are valid
        if (!fromUserId || !roomId || !currentMsgId) {
            return NextResponse.json({ error: 'Missing required query parameters.' }, { status: 400 });
        }

        // Execute the stored procedure with dynamic parameters
        const [result] = await dbconnection.execute(
            'CALL message_master(?, ?, ?, ?, ?, ?)',
            [4, parseInt(fromUserId), null, '', parseInt(roomId), currentMsgId === ('null' || null || '') ? null : currentMsgId]  // Use actual values from request
        );

        // console.log('Result:', result);

        // Return the result as a JSON response
        return NextResponse.json(result[0]);  // You may need to adjust based on the structure of result
    } catch (error) {
        console.error('Error executing stored procedure:', error);

        // Return a 500 error response if something went wrong
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
