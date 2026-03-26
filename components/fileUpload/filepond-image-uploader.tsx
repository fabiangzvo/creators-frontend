"use client";

import "filepond/dist/filepond.min.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";
import {
  FilePondErrorDescription,
  FilePondFile,
  FilePondServerConfigProps,
} from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateSize,
  FilePondPluginImageResize,
  FilePondPluginImageValidateSize,
);

export interface FileImageUploaderProps extends FilePondProps {
  setFiles?: (files: FilePondFile[]) => void;
  label?: string;
  description?: string;
  defaultFiles?: string[] | { source: string; options?: { type: string } }[];
}

export default function FileImageUploader(props: FileImageUploaderProps) {
  const {
    onremovefile,
    setFiles,
    name = "_image",
    label = "Haga clic o arrastre para subir",
    description,
    defaultFiles,
    ...componentProps
  } = props;

  const [files, setLocalFiles] = useState<FilePondServerConfigProps["files"]>();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const fileRef = useRef(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);

      return;
    }

    if (defaultFiles && defaultFiles.length > 0) {
      setLocalFiles(defaultFiles as any);
    }
  }, [defaultFiles, isFirstRender]);

  const onRemoveCoverImages = useCallback(
    (error: FilePondErrorDescription | null, file: FilePondFile) => {
      if (error) {
        console.error(error);

        return;
      }
      if (files?.length) {
        const filteredFiles = files.filter((cover) => {
          if (typeof cover === "string") return cover !== file.filename;

          return "filename" in cover && cover.filename !== file.filename;
        });

        setFiles && setFiles(filteredFiles as any as FilePondFile[]);
      }
      onremovefile?.(error, file);
    },
    [setFiles, files, onremovefile],
  );

  return (
    <div className="w-full h-full">
      <FilePond
        ref={fileRef}
        allowImagePreview
        allowImageResize
        credits={false}
        files={files}
        imageResizeMode="cover"
        imageResizeTargetHeight={50}
        imageResizeTargetWidth={50}
        instantUpload={false}
        labelIdle={`<div class="flex flex-col items-center gap-2 px-8 hover:cursor-pointer my-4">
        <span class="text-xl font-semibold text-foreground">${label}</span>
        ${description ? '<span class="text-sm font-medium text-foreground/40">' + description + "</span>" : ""}
      </div>`}
        maxFileSize="20MB"
        name={name}
        onremovefile={onRemoveCoverImages}
        onupdatefiles={(files) => {
          setLocalFiles(files as any);
          setFiles && setFiles(files as any);
        }}
        server={{ url: "/api/upload/image" }}
        {...componentProps}
      />
    </div>
  );
}
