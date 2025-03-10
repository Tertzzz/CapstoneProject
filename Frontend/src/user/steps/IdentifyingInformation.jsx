import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./IdentifyingInformation.css";

export default function IdentifyingInformation({ nextStep, updateFormData, formData }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      setValue(key, formData[key]); 
    });
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="identifying-form step-form">
      <h2 className="identifying-header step-header">Step 1: Identifying Information</h2>

      {/* Names - Side by Side */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">First Name</label>
          <input type="text" {...register("First name", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Middle Name</label>
          <input type="text" {...register("Middle Name", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Last Name</label>
          <input type="text" {...register("Last name", { required: true })} className="identifying-input step-input" />
        </div>
      </div>

      {/* Age & Gender */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Age</label>
          <input type="number" {...register("Age", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Gender</label>
          <select {...register("Gender", { required: true })} className="identifying-input step-input">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="LGBTQ+">LGBTQ+</option>
          </select>
        </div>
      </div>

      {/* Birthdate & Birthplace */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Date of Birth</label>
          <input type="date" {...register("Date of Birth", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Place of Birth</label>
          <input type="text" {...register("Place of Birth", { required: true })} className="identifying-input step-input" />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="identifying-label step-label">Address</label>
        <input type="text" {...register("Address", { required: true })} className="identifying-input step-input" />
      </div>

      {/* Educational Attainment & Civil Status */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Educational Attainment</label>
          <input type="text" {...register("Educational Attainment", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Civil Status</label>
          <select {...register("Civil Status", { required: true })} className="identifying-input step-input">
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
      </div>

      {/* Occupation & Religion */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Occupation</label>
          <input type="text" {...register("Occupation", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Religion</label>
          <input type="text" {...register("Religion", { required: true })} className="identifying-input step-input" />
        </div>
      </div>

      {/* Company & Monthly Income */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Company/Agency</label>
          <input type="text" {...register("Company/Agency", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Monthly Income</label>
          <input type="number" {...register("Monthly Income", { required: true })} className="identifying-input step-input" />
        </div>
      </div>

      {/* Employment Status */}
      <div>
        <label className="identifying-label step-label">Employment Status</label>
        <select {...register("Employment Status", { required: true })} className="identifying-input step-input">
          <option value="Employed">Employed</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Not employed">Not employed</option>
        </select>
      </div>

      {/* Contact Number & Email */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Contact Number</label>
          <input type="number" {...register("Contact number", { required: true })} className="identifying-input step-input" />
        </div>
        <div>
          <label className="identifying-label step-label">Email Address</label>
          <input type="text" {...register("Email Address", { required: true })} className="identifying-input step-input" />
        </div>
      </div>

      {/* Pantawid Beneficiary & Indigenous */}
      <div className="identifying-row step-row">
        <div>
          <label className="identifying-label step-label">Pantawid Beneficiary</label>
          <select {...register("Pantawid beneficiary", { required: true })} className="identifying-input step-input">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="identifying-label step-label">Indigenous</label>
          <select {...register("Indigenous", { required: true })} className="identifying-input step-input">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <button type="submit" className="identifying-next-btn step-button">Next</button>
    </form>
  );
}
