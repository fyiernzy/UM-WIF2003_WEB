import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import Experience from "../../components/Profile/Experience";
import Skill from "../../components/Profile/Skill";
import Product from "../../components/Profile/Product";
import JobHistory from "../../components/Profile/JobHistory";
import "../../pages-css/Profile/Profile.css";
import { useParams } from "react-router-dom";
import JobHistoryRecruiter from "../../components/Profile/JobHistoryRecruiter";

function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});
  const [isRecruiter, setIsRecruiter] = useState(false);

  const getProfileData = async () => {
    try {
      const response = await fetch(`http://localhost:5050/users/${userId}`, {
        method: "GET"
      });
      const result = await response.json();
      setProfile(result.data);
      setIsRecruiter(result.data.role === "recruiter");
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [userId]);

  return (
    <Container fluid style={{ maxWidth: "70%" }}>
      <Container className="mt-5">
        <ProfileHeader
          name={profile.username}
          university={isRecruiter ? null : profile.university}
          location={`${profile.city}, ${profile.state}`}
          avatarSrc={profile.profilePic}
          headline={profile.headline}
          tags={profile.categories}
          userId={userId}
          role={profile.role}
        />
      </Container>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={5} xs={12}>
            <div className="section-header">
              <h6 className="text-center">{isRecruiter ? "ABOUT US" : "EXPERIENCE"}</h6>
              <hr />
            </div>
            {isRecruiter ? (
              
                profile.about ? (
                  <p>{profile.about}</p>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '20px',
                      fontStyle: 'italic',
                      color: '#858585'
                    }}
                  >
                    About Us hasn't been set
                  </div>
                )
              
            ) : (
              <Experience experiences={profile.experience} />
            )}

            <div className="section-header">
              <h6 className="text-center mt-10">{isRecruiter ? "PRODUCT" : "SKILL"}</h6>
              <hr />
            </div>
            {isRecruiter ? (
              <Product products={profile.product} />
            ) : (
              <Skill skills={profile.skill} />
            )}
          </Col>
          <Col md={7} xs={12}>
            <div className="section-header">
              <h6 className="text-center">JOB HISTORY</h6>
              <hr />
            </div>
            {isRecruiter ? (
              <JobHistoryRecruiter userId={userId}/>
            ) : (
              <JobHistory userId={userId} />
            )}
            
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Profile;
