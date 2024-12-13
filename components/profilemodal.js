'use client'

import { useEffect, useState } from "react"
import "./profilemodal.css";
import states from "../utils/states.json";
import country from "../utils/country.json";
import Image from "next/image";

const ProfileModal = ({ id, handlefun }) => {

    const [selectedState, setSelectedState] = useState('WB');
    const [selectedCountry, setSelectedCountry] = useState("IN");
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState(null);
    const [isImgChange, setIsImgChange] = useState(false);
    const [imgName, setImgName] = useState('');
    const [imgFile, setImgFile] = useState(null);

    console.log('img', imgName);
    console.log('state', selectedState);
    console.log('country', selectedCountry);
    
    
    const formData = new FormData();
    console.log('imgfile', imgFile);
    
    formData.append('profileImage', imgFile);
    formData.append('userid', id);

    const handleUpdateUserProfile = async () => {
        try {
            
            // Step 2: First update the user profile data (without image)
            const res = await fetch('/api/auth/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // JSON header for profile data
                },
                body: JSON.stringify({
                    id : id,
                    name: name,
                    phone: phone,
                    password: password,
                    image: imgName,  // Send the existing image name or image URL, not the file here
                    state: selectedState,
                    country: selectedCountry,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to update profile information');
            }

            // Step 3: If a new profile image is selected, upload the file
            if (isImgChange) {
                const uploadRes = await fetch('/api/uploads', {
                    method: 'POST',
                    body: formData, // Send formData containing the profile image
                });

                console.log('uploaded profile image');
                

                const uploadData = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error('Failed to upload image');
                }

                setIsImgChange(false);

                // Assuming the backend returns the uploaded image URL or filename,
                // update the image URL in the profile information as well
                const updatedImageUrl = uploadData.imageUrl; // Adjust based on the response
                // You can now update the state to reflect the new image URL
                // Optionally, update the user's image field here after upload
                alert('File updated successfully');
            }

            // Step 4: Handle the response (success or failure)
            alert('Profile updated successfully');
            // Optionally, you can update the UI with the new profile data, including image URL

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChangeAddress = (mode, countrycode) => {
        if (mode === 1) {
            setSelectedState(countrycode);
        }
        else if (mode === 2) {
            setSelectedCountry(countrycode);
        }
    }

    console.log('userData', userData);

    const handleFileChange = async (e) => {
        const file = e.target.files[0]; // Get the selected file
        console.log('file: ', file);

        if (file) {
            const fileUrl = URL.createObjectURL(file); // Create a URL for the image
            setImg(fileUrl); // Update the state with the new image URL
            setImgName(`eazzybizz-${id}-${file.name}`);
            setIsImgChange(true);
            setImgFile(file);
        }
    };

    useEffect(() => {
        const getprofile = async () => {
            const response = await fetch(`/api/auth/users?mode=${3}&userid=${parseInt(id)}&email=''`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUserData(data[0]);
        }
        getprofile();
    }, [])

    useEffect(() => {
        if (userData.length > 0) {
            setName(userData[0].username);
            setPhone(userData[0].phone || 'please update phone number!!');
            setPassword(userData[0].password);
            userData[0].state && setSelectedState(userData[0].state);
            userData[0].country && setSelectedCountry(userData[0].country);
            userData[0].profile_img && setImgName(userData[0].profile_img);
            userData[0].profile_img && setImg(`/uploads/${userData[0].profile_img}`);
        }
    }, [userData])

    useEffect(() => {
        imgName && setImg(`/uploads/${imgName}`)
    }, [])

    return (
        <>
            <div className="modal-active">
                <div id="modal-container" className="one">
                    <div className="modal-background">
                        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" style={{ display: "block" }}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handlefun(1)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className='overlay'>
                                            <div className="container">
                                                <div className="main-body">
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="d-flex flex-column align-items-center text-center">
                                                                        {/* <img
                                                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                                            alt="Admin"
                                                                            className="rounded-circle p-1 bg-primary"
                                                                            width={110}
                                                                        /> */}

                                                                        
                                                                            <Image
                                                                                src={img ? img : '/user.png'}
                                                                                alt="Admin"
                                                                                className="rounded-circle p-1 bg-primary"
                                                                                width={110}
                                                                                height={100}
                                                                            />

                                                                        <div className="mt-3" style={{ width: "100%", overflow: "hidden" }}>
                                                                            <input className="p-2" type="file" name="profileImage" onChange={handleFileChange} />

                                                                            <h4>{userData.length > 0 && userData[0].username}</h4>
                                                                            <p className="text-secondary mb-1">{userData.length > 0 && userData[0].email}</p>
                                                                            <p className="text-secondary mb-1">Tata Consultancy Services</p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Full Name</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={name}
                                                                                onChange={(e) => setName(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Phone</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={phone}
                                                                                onChange={(e) => setPhone(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Password</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={password}
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">State</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary">
                                                                            <select
                                                                                className="form-select form-select-sm"
                                                                                aria-label="Small select example"
                                                                                value={selectedState}
                                                                                onChange={(e) => handleChangeAddress(1, e.target.value)}
                                                                            >
                                                                                {states.map((state, i) => {
                                                                                    return (<option value={state.code} key={state.code}>{state.name}</option>)
                                                                                })}

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Country</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-secondary">
                                                                            <select
                                                                                className="form-select form-select-sm"
                                                                                aria-label="Small select example"
                                                                                value={selectedCountry}
                                                                                onChange={(e) => handleChangeAddress(2, e.target.value)}
                                                                            >
                                                                                {country.map((cntry, i) => {
                                                                                    return (<option value={cntry.code} key={cntry.code}>{cntry.name}</option>)
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handlefun(1)}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleUpdateUserProfile}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileModal