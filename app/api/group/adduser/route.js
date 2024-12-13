// File: app/api/some-endpoint/route.js

import { NextResponse } from "next/server";
import { addUserGroup } from '../../../../utils/db';

export async function POST(request) {
    try {
        // Parse incoming JSON request
        const res = await request.json();
        const { users, roomid } = res;

        // Check if the necessary data exists
        if (!users || !roomid) {
            return NextResponse.json({
                message: "Missing required fields: users or roomid"
            }, { status: 400 }); // Bad Request
        }

        // Call the addUserGroup function with the provided users and roomid
        const response = await addUserGroup(users, roomid);

        // Return success message along with the response from db operation
        return NextResponse.json({
            message: "User successfully added to the group",
            response: response
        }, { status: 200 }); // OK

    } catch (error) {
        // Log the error for debugging
        // Handle the signal exception thrown by MySQL
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            // Return the specific error message to the frontend
            return NextResponse.json({
                message: error.sqlMessage || 'An error occurred',
            }, { status: 400 }); // OK
        } else {
            // Handle any unexpected errors
            return NextResponse.json({
                message: 'An error occurred while adding users to the group.',
            }, { status: 500 });
        }
    }
}
