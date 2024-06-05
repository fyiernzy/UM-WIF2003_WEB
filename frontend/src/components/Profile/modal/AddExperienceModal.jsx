// Add this code to your EditProfile component

import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddExperienceModal = ({ show, handleClose, handleSaveExperience, experience = {}, isEditing = false }) => {
    const [info, setInfo] = useState({
        title: experience.title || '',
        employmentType: experience.employmentType || '',
        company: experience.company || '',
        location: experience.location || '',
        locationType: experience.locationType || '',
        description: experience.description || '',
        current: experience.current || false,
        from: experience.from ? new Date(experience.from) : new Date(),
        until: experience.until ? new Date(experience.until) : new Date()
    });

    const employmentTypeOptions = [
        'Part-time',
        'Freelance',
        'Self-employed',
        'Contract',
        'Internship',
        'Apprenticeship',
        'Seasonal'
    ];

    const locationTypeOptions = [
        'On-site',
        'Hybrid',
        'Remote',
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date, field) => {
        setInfo(prevInfo => ({
            ...prevInfo,
            [field]: date
        }));
    };

    const handleSave = () => {
        handleSaveExperience(info);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Experience' : 'Add New Experience'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={info.title}
                            onChange={handleChange}
                            placeholder="Enter job title"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmploymentType" className="mt-3">
                        <Form.Label>Employment Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="employmentType"
                            value={info.employmentType}
                            onChange={handleChange}
                        >
                            <option value="">Select employment type</option>
                            {employmentTypeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCompany" className="mt-3">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            type="text"
                            name="company"
                            value={info.company}
                            onChange={handleChange}
                            placeholder="Enter company name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocation" className="mt-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={info.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocationType" className="mt-3">
                        <Form.Label>Location Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="locationType"
                            value={info.locationType}
                            onChange={handleChange}
                        >
                            <option value="">Select location type</option>
                            {locationTypeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={info.description}
                            onChange={handleChange}
                            placeholder="Enter job description"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mt-3 justify-content-between">
                        <div>
                            <Form.Label>From</Form.Label>
                            <DatePicker
                                selected={info.from}
                                onChange={date => handleDateChange(date, 'from')}
                                className="form-control tw-ml-3"
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                            />
                        </div>
                        <div className='mt-3 '>
                            <Form.Label>Until</Form.Label>
                            <DatePicker
                                selected={info.until}
                                onChange={date => handleDateChange(date, 'until')}
                                className="form-control tw-ml-3"
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                                disabled={info.current}
                            />
                        </div>
                    </Form.Group>
                </Form>
                <Form.Group controlId="formCurrent" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="I am currently working in this role"
                            name="current"
                            checked={info.current}
                            onChange={handleChange}
                        />
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave} style={{ background: '#2D4777', width: '150px', border: "none" }}>
                    {isEditing ? 'Save Changes' : 'Add Experience'}
                </Button>
                <Button onClick={handleClose} style={{ color: '#2D4777', background: '#FFFFFF', width: '100px', border: "1px solid #2D4877" }}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddExperienceModal;
