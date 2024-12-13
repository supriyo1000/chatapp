// // app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import { getUser} from '../../../../utils/db';

// export async function GET() {

//     const users = await getUser(1, '');
    
//     console.log(users);
    

//     if (users) {
//         return NextResponse.json(users);
//     }
//     else {
//         return NextResponse.json('not found', { status: 404 });
//     }
// }


import { NextResponse } from 'next/server';
import { getUser } from '../../../../utils/db';

// Handle the GET request
export async function GET(request) {
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');
    const id = url.searchParams.get('userid');
    const userid = (id === '' || id === undefined || id === 'null' || id === null) ? null : parseInt(id);

    const email = url.searchParams.get('email');
    try {
        // Assuming you're getting all users when mode === 1
        const users = await getUser(parseInt(mode), email , userid);  // Change the second argument based on your logic

        if (users && users.length > 0) {
            return NextResponse.json(users);
        } else {
            return NextResponse.json({ message: 'No users found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}
