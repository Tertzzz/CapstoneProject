import React from "react";
import { useForm } from "react-hook-form";
import "./NeedsProblems.css"


export default function NeedsProblems({ prevStep, nextStep, formData, updateFormData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const onSubmit = (data) => {
    console.log("Step 4 Data:", data);
    updateFormData({ ...formData, ...data }); // ✅ Update data properly
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="needs-form">
      <h2 className="needs-title">Step 4: Needs/Problems of Being a Solo Parent(Kailangan / problema ng isang solo parent)?</h2>
      <input
        type="text"
        className="needs-input"
        placeholder="Enter needs/problems"
        {...register("needsProblems", { required: "This field is required" })}
      />
      {errors.needsProblems && <p className="needs-error">{errors.needsProblems.message}</p>}

      <div className="needs-buttons">
        <button type="button" className="needs-back-btn" onClick={prevStep}>Back</button>
        <button type="submit" className="needs-submit-btn">Next</button>
      </div>
    </form>
  );
}
