// app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import { getUserByEmail } from '../../../../utils/db';
// import { comparePasswords, generateToken } from '../../../../utils/auth';

// export async function POST(req) {
//     const { email, password } = await req.json();

//     console.log(email, password);
    
//     const verifylogin = getUserByEmail(email);

//     if (verifylogin) {
//         return NextResponse.json({userdetails: verifylogin}, { status: 200 });
//     }
//     else {
//         return NextResponse.json('not found', { status: 404 });
//     }
// }

import { NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../utils/db';
import { comparePasswords, generateToken } from '../../../../utils/auth';

export async function POST(req) {
    const { email, password } = await req.json();

    // console.log(email, password);

    // Ensure you await getUserByEmail if it's an async function
    const user = await getUserByEmail(email);

    // Check if the user exists
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
        { userdetails: user},
        { status: 200 }
    );
}

