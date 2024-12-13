// File: app/api/group/create/route.js

import { addUserinChat, createGroup } from "../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const res = await request.json();
        const { userid, recipientId } = res;

        // console.log('users:', userid, recipientId);

        // Call createGroup and await the result
        const result = await addUserinChat(1 , userid, recipientId);

        // Return the group as the response
        return NextResponse.json({ message: `${recipientId} added in ${userid} successfully:`, result });
    } catch (error) {
        console.error("Error adding :", error);
        return NextResponse.json({ message: "Error adding :", error: error.message }, { status: 500 });
    }
}
