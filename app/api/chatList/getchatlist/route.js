import { NextResponse } from "next/server";
import { addUserinChat } from "../../../../utils/db";
export async function GET(request) {
    const url = new URL(request.url);
    const fromUserId = url.searchParams.get('fromuserid');

    try {
        const result = await addUserinChat(2, parseInt(fromUserId), null);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.error(error);
    }

}