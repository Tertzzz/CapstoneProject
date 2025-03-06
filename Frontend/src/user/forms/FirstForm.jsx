import React, { useState } from 'react';
import { useNavigate,  useLocation  } from 'react-router-dom';

export default function FirstForm() {
  const location = useLocation();
  const { user } = location.state || {}; // Access the user data passed from ProfilePage

  console.log(user)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    sex: '',
    dateOfBirth: '',
    placeOfBirth: '',
    address: '',
    educationalAttainment: '',
    occupation: '',
    civilStatus: '',
    religion: '',
    companyAgency: '',
    monthlyIncome: '',
    employmentStatus: '',
    contactNumbers: '',
    pantawidBeneficiary: '',
    indigenousPerson: '',
    lgbtq: '',
  });

 const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (Check if all fields are filled)
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.age || !formData.sex) {
      alert("Please fill out all required fields.");
      return;
    }

    navigate('/second', { state: { formData } });
  };

  return (
    <div className="form-container">
      <h1>IDENTIFYING INFORMATION</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text" id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        {/* Age and Sex */}
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label>Sex:</label>
          <select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth and Place of Birth */}
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="placeOfBirth">Place of Birth:</label>
          <input
            type="text"
            id="placeOfBirth"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            placeholder="Enter your place of birth"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        {/* Educational Attainment */}
        <div>
          <label htmlFor="educationalAttainment">Educational Attainment:</label>
          <input
            type="text"
            id="educationalAttainment"
            name="educationalAttainment"
            value={formData.educationalAttainment}
            onChange={handleChange}
            placeholder="Enter your educational attainment"
          />
        </div>

        {/* Occupation */}
        <div>
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Enter your occupation"
          />
        </div>

        {/* Civil Status */}
        <div>
          <label htmlFor="civilStatus">Civil Status:</label>
          <select name="civilStatus" value={formData.civilStatus} onChange={handleChange}>
            <option value="">Select Civil Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label htmlFor="religion">Religion:</label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            placeholder="Enter your religion"
          />
        </div>

        {/* Company/Agency */}
        <div>
          <label htmlFor="companyAgency">Company/Agency:</label>
          <input
            type="text"
            id="companyAgency"
            name="companyAgency"
            value={formData.companyAgency}
            onChange={handleChange}
            placeholder="Enter your company/agency"
          />
        </div>

        {/* Monthly Income */}
        <div>
          <label htmlFor="monthlyIncome">Monthly Income:</label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            placeholder="Enter your monthly income"
          />
        </div>

        {/* Employment Status */}
        <div>
          <label>Employment Status:</label>
          <label>
            <input
              type="radio"
              name="employmentStatus"
              value="Employed"
              checked={formData.employmentStatus === 'Employed'}
              onChange={handleChange}
            />
            Employed
          </label>
          <label>
            <input
              type="radio"
              name="employmentStatus"
              value="Self-employed"
              checked={formData.employmentStatus === 'Self-employed'}
              onChange={handleChange}
            />
            Self-employed
          </label>
          <label>
            <input
              type="radio"
              name="employmentStatus"
              value="Not Employed"
              checked={formData.employmentStatus === 'Not Employed'}
              onChange={handleChange}
            />
            Not Employed
          </label>
        </div>

        {/* Contact Numbers */}
        <div>
          <label htmlFor="contactNumbers">Contact Numbers:</label>
          <input
            type="text"
            id="contactNumbers"
            name="contactNumbers"
            value={formData.contactNumbers}
            onChange={handleChange}
            placeholder="Enter your contact numbers"
          />
        </div>

        {/* Pantawid Beneficiary */}
        <div>
          <label>Pantawid Beneficiary:</label>
          <label>
            <input
              type="radio"
              name="pantawidBeneficiary"
              value="Yes"
              checked={formData.pantawidBeneficiary === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="pantawidBeneficiary"
              value="No"
              checked={formData.pantawidBeneficiary === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Indigenous Person */}
        <div>
          <label>Indigenous Person:</label>
          <label>
            <input
              type="radio"
              name="indigenousPerson"
              value="Yes"
              checked={formData.indigenousPerson === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="indigenousPerson"
              value="No"
              checked={formData.indigenousPerson === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* LGBTQ+ */}
        <div>
          <label>LGBTQ+:</label>
          <label>
            <input
              type="radio"
              name="lgbtq"
              value="Yes"
              checked={formData.lgbtq === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="lgbtq"
              value="No"
              checked={formData.lgbtq === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
