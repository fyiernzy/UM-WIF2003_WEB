import React from "react";
import { motion } from "framer-motion";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BaseButton({
  icon,
  label,
  onClickFunction,
  isActive,
  inActiveClassName,
}) {
  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClickFunction}
      className="tw-flex-grow tw-flex tw-justify-center tw-items-center"
    >
      <Button
        variant="light"
        className="tw-flex-grow tw-flex tw-justify-center tw-items-center tw-p-3 tw-pl-0 tw-text-md tw-w-full"
      >
        <FontAwesomeIcon
          icon={icon}
          className={`tw-mr-4 ${isActive ? inActiveClassName : ""}`}
        />

        <span
          className={`tw-m-0 tw-text-md ${isActive ? inActiveClassName : ""}`}
        >
          {label}
        </span>
      </Button>
    </motion.div>
  );
}

export default BaseButton;
