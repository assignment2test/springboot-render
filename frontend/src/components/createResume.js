// src/components/CreateResume.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateResume = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [qualifications, setQualification] = useState('');
    const [role, setRole] = useState('');
    const [sideProjects, setSideProjects] = useState('');
    const [education, setEducation] = useState('');
    const [coursesTaught, setCoursesTaken] = useState('');
    const [yearsOfExperience, setYearsExperience] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !role) {
            alert('Please fill in all required fields');
            return;
        }

        if (role === 'developer' && (!sideProjects || !education)) {
            alert('Please fill in all required fields for the developer role');
            return;
        }

        if (role === 'consultant' && (!coursesTaught || !yearsOfExperience)) {
            alert('Please fill in all required fields for the consultant role');
            return;
        }

        const formData = {
            firstName,
            lastName,
            email,
            workExperience,
            qualifications,
            role,
            sideProjects: role === 'developer' ? sideProjects : undefined,
            education: role === 'developer' ? education : undefined,
            coursesTaught: role === 'consultant' ? coursesTaught : undefined,
            yearsOfExperience: role === 'consultant' ? yearsOfExperience : undefined,
        };

        // console.log(formData);

        try {
            const response = await axios.post('http://localhost:8080/api/resume/create', formData);
            console.log(response.data);
            alert('Resume created successfully');
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later');
        }
    };



    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div style={{ fontFamily: 'Calibri, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#88786c' }}>
            <h2 style={{ marginBottom: '20px' }}>FAKECOMPANY, LLC RESUME SUBMISSION:</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '600px', height:'335px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" name="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="text" name="workExperience" placeholder="Work Experience" onChange={(e) => setWorkExperience(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" name="qualification" placeholder="Qualification" onChange={(e) => setQualification(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <select name="role" onChange={handleRoleChange} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="">Select the role you are applying for</option>
                        <option value="developer">Developer</option>
                        <option value="consultant">Consultant</option>
                    </select>
                </div>
                {role === 'developer' && (
                    <>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" name="sideProjects" placeholder="Side Projects" onChange={(e) => setSideProjects(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <textarea name="education" placeholder="Education" onChange={(e) => setEducation(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                    </>
                )}
                {role === 'consultant' && (
                    <>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" name="coursesTaken" placeholder="Courses Taken" onChange={(e) => setCoursesTaken(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="text" name="yearsExperience" placeholder="Skills:" onChange={(e) => setYearsExperience(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                    </>
                )}
                <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#280272', color: 'white', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );

};

export default CreateResume;
