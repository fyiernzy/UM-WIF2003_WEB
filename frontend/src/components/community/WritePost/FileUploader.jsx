import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ files, setFiles }) => {
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    },
    [files, setFiles]
  );

  const removeFile = (fileIndex) => {
    const newFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(newFiles);

    const newPreviews = previews.filter((_, index) => index !== fileIndex);
    setPreviews(newPreviews);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="tw-mb-4">
      <div
        {...getRootProps()}
        className="tw-border-2 tw-border-dashed tw-border-gray-400 tw-p-4 tw-rounded-md tw-cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
      <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-4">
        {previews.map((src, index) => (
          <div key={index} className="tw-relative">
            <img
              src={src}
              alt={`Preview ${index}`}
              className="tw-w-[100px] tw-h-[100px] tw-object-cover tw-rounded-md tw-border"
            />
            <button
              onClick={() => removeFile(index)}
              className="tw-absolute tw-top-0 tw-right-0 tw-bg-red-500 tw-text-white tw-rounded-full tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
