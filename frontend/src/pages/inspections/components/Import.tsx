import { MdUploadFile } from "react-icons/md";
import React, { ChangeEvent, useRef } from "react";
import { apiUploadInspections } from "@/apis/InspectionApi";
import Button from "@/components/ui/button";

const Import = ({ onSuccess }: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const mutation = apiUploadInspections();
  const handleImport = () => {
    if (mutation.isPending) return;
    inputFileRef.current?.click();
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      const formData = new FormData();
      formData.append("file", file, file.name);
      mutation.mutate(formData, {
        onSuccess
      });
    }
  };

  return (
    <Button
      onClick={handleImport}
      color='primary'
      className="flex justify-between gap-3 items-center"
    >
      {mutation.isPending && mutation.progress < 100 && `Uploading ... ${mutation.progress}%`}
      {mutation.isPending && mutation.progress >= 100 && `Importing ... `}
      {!mutation.isPending && <>Upload <MdUploadFile size={16} /></>}
      <input accept=".xml" ref={inputFileRef} type="file" className="hidden" onChange={onFileChange} />
    </Button>
  );
};

export default Import;
