"use client";

import { useCallback, useRef } from "react";
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";
import { FilePondErrorDescription, FilePondFile } from "filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateSize,
  FilePondPluginImageResize
);

export interface FileImageUploaderProps extends FilePondProps {
  setFiles: (files: FilePondFile[]) => void;
}

export default function FileImageUploader(props: FileImageUploaderProps) {
  const {
    onremovefile,
    setFiles,
    files,
    name = '_image',
    ...componentProps
  } = props

  const fileRef = useRef(null);

  const onRemoveCoverImages = useCallback((
    error: FilePondErrorDescription | null,
    file: FilePondFile
  ) => {
    if (error) {
      console.error(error);
      return;
    }
    if (files?.length) {
      const filteredFiles = files.filter((cover) => {
        if (typeof cover === 'string') return cover !== file.filename;
        return 'filename' in cover && cover.filename !== file.filename;
      });

      console.log(filteredFiles);
      setFiles(filteredFiles as any as FilePondFile[]);
    }
    onremovefile?.(error, file);
  }, [setFiles, files, onremovefile]);

  return (
    <div className="w-full h-full">
      <FilePond
        labelIdle='<div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 32px 0;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
          <polyline points="9 15 12 12 15 15"/>
          <line x1="12" y1="12" x2="12" y2="21"/>
        </svg>
        <span style="font-size: 14px; font-weight: 500; color: #374151;">Haga clic o arrastre para subir</span>
        <span style="font-size: 12px; color: #9ca3af;">SVG, PNG, JPG (máx. 800×400px)</span>
      </div>'
        credits={false}
        allowImagePreview
        maxFileSize="20MB"
        server={{
          url: "/api/upload/image",
          headers: {
            image: name
          }
        }}
        ref={fileRef}
        files={files}
        name={name}
        onupdatefiles={setFiles}
        onremovefile={onRemoveCoverImages}
        instantUpload={false}
        {...componentProps}
      />
    </div>
  );
}