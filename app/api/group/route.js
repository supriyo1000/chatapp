// File: app/api/group/create/route.js

import { createGroup } from "../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const res = await request.json();
        const { roomname, users } = res;

        if (typeof users === 'string') {
            users = JSON.parse(users);
        }

        // console.log('users:', users, roomname);
        

        // Validate input data
        if (!roomname || !Array.isArray(users) || users.length === 0) {
            return NextResponse.json({ message: "Invalid room name or users array" }, { status: 400 });
        }

        // Call createGroup and await the result
        const group = await createGroup(1, null, roomname, users);

        // Return the group as the response
        return NextResponse.json({ message: "Group created successfully", group });
    } catch (error) {
        console.error("Error creating group:", error);
        return NextResponse.json({ message: "Error creating group", error: error.message }, { status: 500 });
    }
}
