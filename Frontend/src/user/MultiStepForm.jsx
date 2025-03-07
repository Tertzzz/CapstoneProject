import React, { useState,  useLocation } from "react";
import IdentifyingInformation from "./steps/IdentifyingInformation";
import FamilyOccupation from "./steps/FamilyOccupation";
import "./MultiStepForm.css";
import Classification from "./steps/Classification";
import NeedsProblems from "./steps/NeedsProblems";
import InCaseOfEmergency from "./steps/InCaseOfEmergency";

export default function MultiStepForm() {
  const [step, setStep] = useState(1); // ✅ Track current step
  const totalSteps = 5; // Update this if you add more steps

  // ✅ Store form data for all steps
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    placeOfBirth: "",
    address: "",
    education: "",
    civilStatus: "",
    occupation: "",
    religion: "",
    company: "",
    income: "",
    employmentStatus: "",
    contactNumber: "",
    email: "",
    pantawidBeneficiary: "",
    indigenous: "",
    fatherOccupation: "",
    motherOccupation: "",
  });

  // ✅ Update form data without losing previous values
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div>
    <div>
      {step === 1 && (
        <IdentifyingInformation
          nextStep={nextStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}
      {step === 2 && (
        <FamilyOccupation
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}
      {step === 3 && (
        <Classification
        prevStep={prevStep}
        nextStep={nextStep}
        updateFormData={updateFormData} // ✅ Fix prop name
        formData={formData}
      />      
      )}
      {step === 4 && (
        <NeedsProblems
        prevStep={prevStep}
        nextStep={nextStep}
        updateFormData={updateFormData} // ✅ Fix prop name
        formData={formData}
      />      
      )}
      {step === 5 && (
      <InCaseOfEmergency
        prevStep={prevStep}
        updateFormData={updateFormData}
        formData={formData}
      />
      )}
    </div>
    {/* ✅ Pagination (Directly inside MultiStepForm) */}
    <div className="pagination">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`pagination-dot ${step === index + 1 ? "active" : ""}`}
          ></div>
        ))}
        <p>Step {step} of {totalSteps}</p>
      </div>
    </div>
  );
}
