import { useState } from "react";
import styles from "../../components-css/navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import ProfilePic from "../../assets/images/profile_pic.svg";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import UserProfileMenu from "./UserProfileMenu";
import NotificationBell from "../jobscape/NotificationBell";
import AuthLinks from "./AuthLinks";

export default function NavBar() {
  const { user, updateUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const linkProps = [
    { label: "Jobscape", link: "/JobscapeMainPage" },
    { label: "Seek Jobs", link: "/SeekJobPage" },
    { label: "Community", link: "/Community" },
    { label: "About Us", link: "/AboutUs" },
  ];

  const handleSignOut = async () => {
    const result = await logoutUser();
    if (result.status) {
      updateUser(null); // Clear the user context
      navigate("/Login"); // Redirect to the login page
    } else {
      console.error("Sign out failed");
    }
  };

  const handleClick = (link) => {
    setActiveTab(link);
  };

  return (
    <div className={`${styles.navbarStyle} tw-p-2`}>
      <nav className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center tw-px-5 lg:tw-px-10 tw-text-lg navbar">
        <div>
          <Link className="tw-text-3xl tw-font-kaushan" to="/">
            UniJobs
          </Link>
        </div>

        <div className="tw-hidden lg:tw-inline">
          {user && (
            <ul className="tw-flex tw-gap-4">
              {linkProps.map((linkProp) => (
                <li
                  key={linkProp.label}
                  className={activeTab === linkProp.link ? styles.active : ""}
                >
                  <Link
                    to={linkProp.link}
                    className={`${styles.navLink} tw-text-secondary`}
                    onClick={() => handleClick(linkProp.link)}
                  >
                    {linkProp.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {user ? <NotificationBell /> : <></>}
        <div>
          {user ? (
            <UserProfileMenu
              profilePic={ProfilePic}
              handleSignOut={handleSignOut}
            />
          ) : (
            <AuthLinks />
          )}
        </div>
      </nav>
    </div>
  );
}
