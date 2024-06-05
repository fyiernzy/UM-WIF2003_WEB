import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Image, Modal, Form } from 'react-bootstrap';
import ExpandableInput from '../../components/Profile/ExpandableInput';
import ExpandableExperience from '../../components/Profile/ExpandableExperience';
import default_avatar from '../../assets/icons/profile/avatar-default-symbolic-svgrepo-com.svg';
import UploadPicIcon from '../../assets/icons/profile/upload_pic.svg';
import CancelIcon from '../../assets/icons/profile/cancel.svg';
import WorkCaseIcon from '../../assets/icons/profile/work-case-svgrepo-com 1.svg';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components-css/Profile/EditProfileCSS.css';


function EditProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
    const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ title: '', date: '', description: '' });
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [productIndex, setProductIndex] = useState(-1);

    const getProfileData = async () => {
        try {
            const response = await fetch(`http://localhost:5050/users/${userId}`, {
                method: 'GET'
            });
            const result = await response.json();
            setProfileData(result.data || {});
            setIsRecruiter(result.data.role === "recruiter");
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, [userId]);

    const handleSave = async () => {
        try {
            setShowLoading(true);
            const response = await fetch(`http://localhost:5050/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                setShowLoading(false);
                setShowSuccessModal(true);
            } else {
                console.error('Error updating profile data');
                setShowLoading(false);
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
            setShowLoading(false);
        }
    };

    const handleCancel = () => {
        setShowConfirmCancelModal(true);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({
                    ...profileData, profilePic: reader.result.split(',')[1],
                });
                setShowModal(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePicture = async () => {
        try {
            const response = await fetch(`http://localhost:5050/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...profileData, profilePic: '', profilePicContentType: '' })
            });
            if (response.ok) {
                setProfileData({ ...profileData, profilePic: '' });
                setShowModal(false);
            } else {
                console.error('Error removing profile picture');
            }
        } catch (error) {
            console.error('Error removing profile picture:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleCategoryChange = (newCategories) => {
        setProfileData({ ...profileData, categories: newCategories });
    };

    const handleSkillChange = (newSkills) => {
        setProfileData({ ...profileData, skill: newSkills });
    };

    const handleExperienceChange = (newExperiences) => {
        setProfileData({ ...profileData, experience: newExperiences });
    };

    const handleProductChange = (newProducts) => {
        setProfileData({ ...profileData, product: newProducts });
    };

    const confirmSave = () => {
        setShowConfirmSaveModal(true);
    };

    const handleConfirmSave = () => {
        setShowConfirmSaveModal(false);
        handleSave();
    };

    const handleConfirmCancel = () => {
        setShowConfirmCancelModal(false);
        navigate(`/Profile/${userId}`);
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate(`/Profile/${userId}`);
    };

    const handleProductModalShow = (product = { title: '', date: '', description: '' }, index = -1) => {
        setCurrentProduct(product);
        setProductIndex(index);
        setIsEditingProduct(index !== -1);
        setShowProductModal(true);
    };

    const handleProductModalClose = () => {
        setShowProductModal(false);
        setCurrentProduct({ title: '', date: '', description: '' });
    };

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleSaveProduct = () => {
        const updatedProducts = [...(profileData.product || [])];
        if (isEditingProduct && productIndex !== -1) {
            updatedProducts[productIndex] = currentProduct;
        } else {
            updatedProducts.push(currentProduct);
        }
        handleProductChange(updatedProducts);
        handleProductModalClose();
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = [...(profileData.product || [])];
        updatedProducts.splice(index, 1);
        handleProductChange(updatedProducts);
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <div className="mt-5 w-50">
                <p style={{ fontWeight: '700', fontSize: '22px' }}>Edit Profile</p>
                <Container className="text-center">
                    <div className="profile-pic-container position-relative d-inline-flex justify-content-center">
                        <Image
                            src={profileData.profilePic ? `data:${profileData.profilePic};base64,${profileData.profilePic}` : default_avatar}
                            roundedCircle
                            style={{ width: '150px', height: '150px' }}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                        <img
                            src={UploadPicIcon}
                            alt="Upload Pic"
                            className="upload-icon position-absolute bottom-0 end-0"
                            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                </Container>
                <div className="w-100" style={{ marginTop: '30px' }}>
                    <div>
                        <p style={{ fontWeight: '700' }}>Username</p>
                        <input
                            className="bigInput"
                            type="text"
                            name="username"
                            value={profileData.username || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <p style={{ fontWeight: '700', marginTop: '10px' }}>Headline</p>
                    <input
                        className="bigInput"
                        type="text"
                        name="headline"
                        value={profileData.headline || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-flex gap-5 mt-2">
                    <div style={{ width: '50%' }}>
                        <p style={{ fontWeight: '700' }}>City</p>
                        <input
                            className="smallInput"
                            type="text"
                            name="city"
                            value={profileData.city || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ width: '50%' }}>
                        <p style={{ fontWeight: '700' }}>State</p>
                        <input
                            className="smallInput"
                            type="text"
                            name="state"
                            value={profileData.state || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {!isRecruiter && (
                    <div>
                        <p style={{ fontWeight: '700', marginTop: '10px' }}>University</p>
                        <input
                            className="bigInput"
                            type="text"
                            name="university"
                            value={profileData.university || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="mt-3">
                    <p style={{ fontWeight: '700' }}>Category</p>
                    <ExpandableInput
                        defaultWords={profileData.categories || []}
                        title="category"
                        onChange={handleCategoryChange}
                    />
                </div>
                {isRecruiter ? (
                    <div>
                        <p style={{ fontWeight: '700', marginTop: '20px' }}>About Us</p>
                        <textarea
                            rows={5}
                            className="w-100"
                            name="about"
                            value={profileData.about}
                            onChange={handleInputChange}
                        />
                        <div>
                            <p style={{ fontWeight: '700', marginTop: '20px' }}>Product</p>
                        </div>
                        <div>
                            <p onClick={handleProductModalShow} className="edit-button"
                                        style={{
                                            color: '#2D4777',
                                            border: 'none',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                            marginRight: '10px'
                                        }}>+ Add new product</p>
                        </div>
                        {profileData.product?.map((product, index) => (
                            <>
                            <div key={index} className="product-item" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                padding: '10px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                borderRadius: '5px'
                            }}>
                                <div className="title-and-icon" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <img src={WorkCaseIcon} alt="Work Case Icon" className="work-case-icon" style={{
                                        width: '30px',
                                        height: '30px',
                                        marginRight: '10px'
                                    }} />
                                    <p className="product-title" style={{
                                        flexGrow: 1,
                                        marginRight: '10px',
                                        fontWeight:'bold'
                                    }}>
                                        {product.title}
                                    </p>
                                    <button
                                        onClick={() => handleProductModalShow(product, index)}
                                        className="edit-button"
                                        style={{
                                            color: '#2D4777',
                                            border: 'none',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                            marginRight: '10px'
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="details" >
                                {new Date(product.date).toLocaleString('default', { day:'numeric', month: 'long', year: 'numeric' })} 
                                </div>
                                <div className="details">
                                    <p>{product.description}</p>
                                </div>
                                <img
                                    onClick={() => handleDeleteProduct(index)}
                                    src={CancelIcon}
                                    alt="Cancel Icon"
                                    className="cancel-icon mt-3"
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '30px',
                                        height: '30px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        </>
                        
                        ))}
                    </div>
                ) : (
                    <div>
                        <p style={{ fontWeight: '700', marginTop: '20px' }}>Skill</p>
                        <ExpandableInput
                            defaultWords={profileData.skill || []}
                            title="skill"
                            onChange={handleSkillChange}
                        />
                        <div>
                            <p style={{ fontWeight: '700', marginTop: '20px' }}>Experience</p>
                            <ExpandableExperience
                                defaultWords={profileData.experience || []}
                                userId={userId}
                                onChange={handleExperienceChange}
                            />
                        </div>
                    </div>
                )}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Profile Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex flex-column align-items-center">
                        <Button onClick={() => fileInputRef.current.click()} style={{ background: '#2D4777', border: "none", padding: '10px' }}>Choose Picture</Button>
                        <Button style={{ background: '#898989', border: "none", padding: '10px', marginTop: '10px' }} onClick={handleRemovePicture}>Remove Picture</Button>
                    </Modal.Body>
                </Modal>
                <Modal show={showConfirmSaveModal} onHide={() => setShowConfirmSaveModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Save</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to save the changes?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ background: '#2D4777', width: '100px', border: "none" }} onClick={handleConfirmSave}>Save</Button>
                        <Button style={{ color: '#2D4777', background: '#FFFFFF', width: '100px', border: "1px solid #2D4877" }} onClick={() => setShowConfirmSaveModal(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showConfirmCancelModal} onHide={() => setShowConfirmCancelModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Cancel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to discard the changes?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ background: '#2D4777', width: '100px', border: "none" }} onClick={handleConfirmCancel}>Yes</Button>
                        <Button style={{ color: '#2D4777', background: '#FFFFFF', width: '100px', border: "1px solid #2D4877" }} onClick={() => setShowConfirmCancelModal(false)}>No</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showLoading} centered>
                    <Modal.Body className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={showSuccessModal} onHide={handleSuccessModalClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <i className="bi bi-check-circle" style={{ fontSize: '5rem', color: 'green' }}></i>
                        <p>Info is successfully saved</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleSuccessModalClose} style={{ background: '#2D4777' }}>OK</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showProductModal} onHide={handleProductModalClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={currentProduct.title}
                                    onChange={handleProductInputChange}
                                    placeholder="Enter product title"
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductDate" className="mt-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={currentProduct.date}
                                    onChange={handleProductInputChange}
                                    placeholder="Enter product date"
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductDescription" className="mt-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={currentProduct.description}
                                    onChange={handleProductInputChange}
                                    rows={3}
                                    placeholder="Enter product description"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ background: '#2D4777', width: '125px', border: "none" }} onClick={handleSaveProduct}>{isEditingProduct ? 'Save Changes' : 'Add Product'}</Button>
                        <Button style={{ color: '#2D4777', background: '#FFFFFF', width: '100px', border: "1px solid #2D4877" }} onClick={handleProductModalClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <div style={{ display: 'flex', marginBottom: '50px' }} className='gap-5 justify-content-center mt-5'>
                    <Button onClick={confirmSave} style={{ background: '#2D4777', width: '100px', border: "none" }}>Save</Button>
                    <Button onClick={handleCancel} style={{ color: '#2D4777', background: '#FFFFFF', width: '100px', border: "1px solid #2D4877" }}>Cancel</Button>
                </div>
            </div>
        </Container >
    );
}

export default EditProfile;