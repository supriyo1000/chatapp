import { ProfileUpdate } from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { id, name, phone, password, image, state, country } = await request.json();

    // console.log(id, name, phone, password, image, state, country);
    
    
    try {
        const result = await ProfileUpdate(id, name, phone, password, image, state, country);

        return NextResponse.json({
            message:`User Profile Update successfull: `, result });

    } catch (error) {
        return NextResponse.error({ message: `error occured:`, error });
    }

    
}