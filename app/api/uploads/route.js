// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Create the uploads folder if it doesn't exist
// const uploadPath = path.join(process.cwd(), 'kkkkk');
// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(process.cwd(), 'kkkkk'); // The directory you want to upload to
//         console.log('Upload path:', uploadPath);

//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }

//         cb(null, uploadPath); // Save to the correct folder
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + path.extname(file.originalname); // Add a timestamp to avoid naming conflicts
//         console.log('Saving file as:', uniqueName);
//         cb(null, uniqueName); // Save file with the unique name
//     },
// });

// // Apply multer
// const upload = multer({ storage });

// // Handle POST requests
// export async function POST(req) {
//     return new Promise((resolve, reject) => {
//         upload.single('profileImage')(req, {}, (err) => {
//             if (err) {
//                 console.error('Error during file upload:', err);
//                 return reject(new Response('Error uploading file', { status: 500 }));
//             }

//             // Log the file's details
//             console.log('File uploaded successfully:', req.file);

//             resolve(new Response(JSON.stringify({ message: 'File uploaded successfully', file: req.file }), { status: 200 }));
//         });
//     });
// }

import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req) => {
    try {
        const formData = await req.formData();
        const file = formData.get("profileImage");
        const id = formData.get("userid");

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        // const userid = id.replaceAll(" ", "_");
        const uploadPath = path.join(process.cwd(), "public/uploads", `eazzybizz-${parseInt(id)}-${filename}`);

        // Ensure the folder exists before saving the file
        const fs = require("fs");
        if (!fs.existsSync(path.dirname(uploadPath))) {
            fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
        }

        await writeFile(uploadPath, buffer);
        return NextResponse.json({ message: "File uploaded successfully", status: 200 });
    } catch (error) {
        console.error("Error occurred during file upload:", error);
        return NextResponse.json({ error: "Failed to upload file", status: 500 });
    }
};
