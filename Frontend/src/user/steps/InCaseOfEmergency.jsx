import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./InCaseOfEmergency.css"; // Scoped styles

export default function InCaseOfEmergency({ prevStep, nextStep, formData, updateFormData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
  });

  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState(null); // Store data to submit

  const onSubmit = (data) => {
    setFormDataToSubmit(data); // Store the form data
    setIsConfirming(true); // Show confirmation popup
  };

  const confirmSubmission = () => {
    setIsConfirming(false);
    setIsSubmitted(true); // Show success popup

    // Simulating a delay for animation
    setTimeout(() => {
      updateFormData(formDataToSubmit); // Use stored data
      nextStep(); // Move to the next step
    }, 2000); // Delay to show animation
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="ice-form">
        <h2 className="ice-header">In Case of Emergency</h2>

        <label className="ice-form-label">Name</label>
        <input
          type="text"
          className="ice-form-input"
          placeholder="Full Name"
          {...register("emergencyName", { required: "This field is required" })}
        />
        {errors.emergencyName && <p className="ice-error-message">{errors.emergencyName.message}</p>}

        <label className="ice-form-label">Relationship</label>
        <input
          type="text"
          className="ice-form-input"
          placeholder="Relationship"
          {...register("emergencyRelationship", { required: "This field is required" })}
        />
        {errors.emergencyRelationship && <p className="ice-error-message">{errors.emergencyRelationship.message}</p>}

        <label className="ice-form-label">Address</label>
        <input
          type="text"
          className="ice-form-input"
          placeholder="Address"
          {...register("emergencyAddress", { required: "This field is required" })}
        />
        {errors.emergencyAddress && <p className="ice-error-message">{errors.emergencyAddress.message}</p>}

        <label className="ice-form-label">Contact Number</label>
        <input
          type="tel"
          className="ice-form-input"
          placeholder="Contact Number"
          {...register("emergencyContact", { 
            required: "This field is required", 
            pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" }
          })}
        />
        {errors.emergencyContact && <p className="ice-error-message">{errors.emergencyContact.message}</p>}

        <div className="ice-form-buttons">
          <button type="button" className="ice-back-btn" onClick={prevStep}>Back</button>
          <button type="submit" className="ice-next-btn">Submit</button>
        </div>
      </form>

      {/* Confirmation Popup */}
      {isConfirming && (
        <div className={`ice-popup-overlay ${isConfirming ? "active" : ""}`}>
          <div className="ice-popup-content">
            <h3 className="ice-popup-header">Are you sure you want to submit?</h3>
            <button className="ice-confirm-btn" onClick={confirmSubmission}>Yes, Submit</button>
            <button className="ice-cancel-btn" onClick={() => setIsConfirming(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isSubmitted && (
        <div className={`ice-popup-overlay ${isSubmitted ? "active" : ""}`}>
          <div className="ice-popup-content ice-success-popup">
            <div className="ice-checkmark">✔</div>
            <h3 className="ice-popup-header">Application Submitted Successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
