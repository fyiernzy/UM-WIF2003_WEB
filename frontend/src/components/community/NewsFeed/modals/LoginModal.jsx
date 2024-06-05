import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../context/UserContext";
import Office from "../../../../assets/images/office.jpg";
import { getUser } from "../../../../api/authApi";

const LoginModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUser } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const user = await getUser(email, password);

    if (user) {
      updateUser(user);
      onClose();
    } else {
      updateUser(null);
      // Optionally, you can show an error message here
    }
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 z-50">
      <div className="tw-relative tw-h-4/5 tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-[65vw] tw-flex tw-flex-col tw-justify-center">
        <button
          className="tw-absolute tw-top-4 tw-right-4 tw-text-xl tw-text-gray-700 tw-transition tw-transform tw-duration-200 tw-ease-in-out hover:tw-scale-110 hover:tw-text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="tw-h-full tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-3">
          <div className="tw-w-full tw-h-full md:tw-w-1/2 tw-mt-4 md:tw-mt-0">
            <img
              src={Office}
              alt="Illustration"
              className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
            />
          </div>

          <div className="tw-w-full md:tw-w-1/2 tw-p-8">
            <h2 className="tw-text-3xl tw-font-lato tw-font-bold tw-mb-7">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="tw-w-full">
              <div className="tw-mb-4">
                <label
                  className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg tw-shadow-sm"
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="tw-text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="tw-mb-4">
                <label
                  className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg tw-shadow-sm"
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="tw-text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-w-full tw-transition tw-transform tw-duration-150 tw-ease-in-out hover:tw-bg-blue-700"
              >
                Login
              </button>
            </form>
            <hr className="tw-my-4" />
            <button
              onClick={handleNavigate}
              className="tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-lg tw-w-full tw-transition tw-transform tw-duration-150 tw-ease-in-out hover:tw-bg-gray-300"
            >
              Go to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
