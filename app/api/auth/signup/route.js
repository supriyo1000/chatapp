// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { addUser, getUserByEmail } from '../../../../utils/db';
import { hashPassword } from '../../../../utils/auth';

export async function POST(req) {
    const { email, name, password } = await req.json();

    console.log(email, name, password);


    const result = await addUser({ email, name, password, created_at: null, phone: null, country: '', state: '', room: {} })
    return NextResponse.json({ message: 'User created successfully :', result }, { status: 200 });

}

