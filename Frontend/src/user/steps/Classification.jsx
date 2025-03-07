import React from "react";
import { useForm } from "react-hook-form";
import "./Classification.css"

export default function Classification({ prevStep, nextStep, formData, updateFormData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const onSubmit = (data) => {
    console.log("Step 3 Data:", data);
    updateFormData(data); // ✅ Fix: Ginamit ang tamang function
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="classification-form">
      <h2 className="classification-header">
        Classification/Circumstances of Being a Solo Parent (Dahilan bakit Naging Solo Parent)
      </h2>
      <input 
        type="text" 
        placeholder="" 
        {...register("Classification", { required: true })} 
        className="classification-input"
      />
      {errors.Classification && <p className="classification-error">Required field</p>}

      <div className="classification-buttons">
        <button type="button" className="classification-back-btn" onClick={prevStep}>Back</button>
        <button type="submit" className="classification-next-btn">Next</button>
      </div>
    </form>
  );
}
