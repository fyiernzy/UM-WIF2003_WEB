import { motion } from "framer-motion";

const ImageComponent = ({ src, remainingImagesCount, isLast }) => {
  console.log(
    "In ImageComponent, src:",
    src,
    "remainingImagesCount:",
    remainingImagesCount,
    "isLast:",
    isLast
  );
  return (
    <motion.div
      className="tw-w-full tw-h-full tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
      whileHover={{
        scale: 0.95,
        transition: { duration: 0.3 },
      }}
    >
      <img
        src={src}
        alt="gallery"
        className="tw-w-full tw-h-full tw-object-cover tw-rounded"
      />
      {remainingImagesCount > 0 && isLast ? (
        <motion.div
          className="tw-absolute tw-top-0 tw-left-0 tw-inset-0 tw-bg-black tw-flex tw-items-center tw-justify-center tw-text-white tw-text-3xl"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
        >
          +{remainingImagesCount}
        </motion.div>
      ) : (
        <motion.div
          className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.div>
  );
};

export default ImageComponent;
