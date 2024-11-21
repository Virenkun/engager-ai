"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ErrorMessage } from "@hookform/error-message";
import { Loader } from "@/components/loader";
import FormGenerator from "../forms/form-generator";
import { UploadIcon } from "lucide-react";
import { useProducts } from "@/hooks/settings/use-settings";

type CreateProductFormProps = {
  id: string;
};

export const CreateProductForm = ({ id }: CreateProductFormProps) => {
  const { onCreateNewProduct, register, errors, loading } = useProducts(id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    console.log(errors);
  };
  return (
    <form
      className="mt-3 w-full flex flex-col gap-5 py-10"
      onSubmit={onCreateNewProduct}
    >
      <FormGenerator
        inputType="input"
        register={register}
        label="Name"
        name="name"
        errors={errors}
        placeholder="Your product name"
        type="text"
      />
      <FormGenerator
        inputType="input"
        register={register}
        label="Price"
        name="price"
        errors={errors}
        placeholder="0.00"
        type="text"
      />
      <div className="flex flex-col items-start">
        <div>
          <Label
            htmlFor="upload-product"
            className="flex gap-2 p-3 rounded-lg bg-violet-700 text-white h-[40px] cursor-pointer font-semibold text-sm items-center"
          >
            <Input
              {...register("image")}
              className="hidden"
              type="file"
              id="upload-product"
              onChange={handleFileChange}
            />
            <UploadIcon className="text-white" />
            Upload
          </Label>

          {imageUrl && (
            <div className="mt-3">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="max-w-28 h-auto rounded-lg"
              />
            </div>
          )}
        </div>
        <ErrorMessage
          errors={errors}
          name="image"
          render={({ message }) => (
            <p className="text-red-400 mt-2">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        <Loader loading={loading}>Create Product</Loader>
      </Button>
    </form>
  );
};
