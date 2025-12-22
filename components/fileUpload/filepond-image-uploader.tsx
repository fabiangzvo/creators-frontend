"use client";

import { useCallback, useRef, useState } from "react";
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";
import { FilePondErrorDescription, FilePondFile, FilePondServerConfigProps } from "filepond";

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
  label?: string;
  description?: string;
}

export default function FileImageUploader(props: FileImageUploaderProps) {
  const {
    onremovefile,
    setFiles,
    name = '_image',
    label = "Haga clic o arrastre para subir",
    description,
    ...componentProps
  } = props

  const [files, setLocalFiles] = useState<FilePondServerConfigProps["files"]>([]);
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
        labelIdle={`<div class="flex flex-col items-center gap-2 px-8 hover:cursor-pointer my-4">
        <div class="flex justify-center items-center bg-background rounded-full w-12 h-12">
        <svg class="text-primary-500!" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
          <polyline points="9 15 12 12 15 15"/>
          <line x1="12" y1="12" x2="12" y2="21"/>
        </svg>
        </div>
        <span class="text-xl font-bold text-foreground">${label}</span>
        ${description ? '<span class="text-sm font-medium text-foreground/40">' + description + '</span>' : ''}
      </div>`}
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
        onupdatefiles={(files) => { setLocalFiles(files as any); setFiles(files as any) }}
        onremovefile={onRemoveCoverImages}
        instantUpload={false}
        allowImageResize
        imageResizeTargetWidth={200}
        imageResizeTargetHeight={200}
        imageResizeMode="cover"
        imageResizeUpscale
        {...componentProps}
      />
    </div>
  );
}