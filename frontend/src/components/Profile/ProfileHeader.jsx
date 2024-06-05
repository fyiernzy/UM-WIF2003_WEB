import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import EditProfileIcon from '../../assets/icons/profile/edit_fill.svg';
import default_avatar from "../../assets/icons/profile/avatar-default-symbolic-svgrepo-com.svg";
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import AccessToInvoicePayment from '../payment/AccessToInvoicePayment';

function ProfileHeader(props) {
  const { name, university, location, avatarSrc, headline, tags = [], userId, role } = props;
  const { user } = useUserContext();

  const renderValue = (value, fieldName) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'undefined, undefined') {
      return value;
    } else {
      return (
        <span style={{ fontStyle: 'italic', color: '#858585' }}>
          {`${fieldName} hasn't been set`}
        </span>
      );
    }
  };

  return (
    <><Container style={{ margin: 'auto', width: '1000px' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={3} className="text-center">
          <Image
            src={avatarSrc ? `data:${avatarSrc};base64,${avatarSrc}` : default_avatar}
            roundedCircle
            style={{ width: '180px', height: '180px' }} />
        </Col>
        <Col xs={12} md={5}>
          <p style={{ marginTop: '10px', fontSize: '25px', fontWeight: 'bold' }}>
            {renderValue(name, 'Name')}
          </p>
          <div style={{ display: 'flex', marginTop: '5px', gap: "25px" }}>
            <p style={{ color: '#858585', marginRight: '' }}>
              {renderValue(location, 'Location')}
            </p>
            {role === 'recruiter' ? (
              null
            ) : (<p style={{ color: '#2D4777' }}>
              {renderValue(university, 'University')}
            </p>
            )}

          </div>
          <p style={{ marginTop: '5px' }}>
            {renderValue(headline, 'Headline')}
          </p>
          <div style={{ display: 'flex' }}>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#80D1D5',
                    color: 'white',
                    padding: '5px 10px',
                    marginTop: '15px',
                    marginRight: '20px',
                    borderRadius: '10px',
                  }}
                >
                  {tag}
                </div>
              ))
            ) : (
              <div style={{ fontStyle: 'italic', color: '#858585', marginTop: '15px' }}>
                Tags haven't been set
              </div>
            )}
            {userId === user._id && (
              <Link to={`/EditProfile/${userId}`}>
                <img
                  src={EditProfileIcon}
                  alt="edit profile"
                  style={{ width: '30px', height: '30px', marginLeft: '20px', marginTop: '15px' }} />
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </Container>
    {role === 'recruiter' && <AccessToInvoicePayment />}
    </>
  );
}

export default ProfileHeader;
