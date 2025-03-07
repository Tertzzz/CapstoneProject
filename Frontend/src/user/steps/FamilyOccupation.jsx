import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import "./FamilyComposition.css";

export default function FamilyComposition({ prevStep, nextStep, formData, updateFormData }) { 
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm({
    defaultValues: formData
  });

  // Watch the number of children dynamically
  const numberOfChildren = watch("Number of children") || 0;

  // Function to calculate age from birthdate
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    // Ensure we're not trying to watch the same fields multiple times
    for (let index = 0; index < numberOfChildren; index++) {
      const birthdate = watch(`children[${index}].Birthdate`);

      if (birthdate) {
        const age = calculateAge(birthdate);
        setValue(`children[${index}].Age`, age);
      }
    }
  }, [numberOfChildren, watch, setValue]);  // Watch and setValue need to be listed as dependencies

  // Handle Form Submission
  const onSubmit = async (data) => {
    console.log("Step 2 Data:", data);

    // Validate before proceeding
    const isValid = await trigger();
    if (!isValid) {
      console.error("Validation failed, check form fields.");
      return;
    }

    updateFormData({ ...formData, ...data });
    nextStep(); // ✅ Only proceed if form is valid
  };

  return (
    <form className="family-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Title: Number of Children */}
      <h3>Family Composition</h3>
      <label className="form-label">Number of Children</label>
      <input
        className={`form-input ${errors["Number of children"] ? 'error' : ''}`}
        type="number"
        {...register("Number of children", { required: "This field is required", min: 0 })}
        onBlur={() => trigger("Number of children")}
      />
      {errors["Number of children"] && <span className="error-message">{errors["Number of children"].message}</span>}

      {Array.from({ length: numberOfChildren }).map((_, index) => (
        <div key={index} className="child-form">
          <h4>Child {index + 1}</h4>

          {/* Title: Child Name */}
          <h5>Full Name</h5>
          <div className="name-row">
            <input className="form-input" type="text" placeholder="First name" {...register(`children[${index}].First name`, { required: "Required" })} />
            <input className="form-input" type="text" placeholder="Middle name" {...register(`children[${index}].Middle name`, { required: "Required" })} />
            <input className="form-input" type="text" placeholder="Last name" {...register(`children[${index}].Last name`, { required: "Required" })} />
          </div>

          {/* Title: Birth Information */}
          <label className="form-label">Birthdate</label>
          <input 
            className="form-input" 
            type="date" 
            {...register(`children[${index}].Birthdate`, { required: "Required" })} 
          />
          
          <label className="form-label">Age (Auto-Calculated)</label>
          <input 
            className="form-input" 
            type="number" 
            placeholder="Age" 
            {...register(`children[${index}].Age`, { required: "Required", max: 21 })} 
            readOnly // Prevent manual input
          />

          {/* Title: Educational Background */}
          <h5>Educational Background</h5>
          <input className="form-input" type="text" placeholder="Educational Attainment (N/A if none)" {...register(`children[${index}].Educational Attainment`, { required: "Required" })} />
        </div>
      ))}

      <div className="form-buttons">
        <button type="button" className="back-btn" onClick={prevStep}>Back</button>
        <button type="submit" className="next-btn">Next</button>
      </div>
    </form>
  );
}
