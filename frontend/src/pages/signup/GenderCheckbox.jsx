const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex justify-evenly">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "Male" ? "selected" : ""
          }`}
        >
          <span className="label-text text-lg font-semibold">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 checkbox-info"
            checked={selectedGender === "Male"}
            onChange={() => onCheckboxChange("Male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "Female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-lg font-semibold">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 checkbox-info"
            checked={selectedGender === "Female"}
            onChange={() => onCheckboxChange("Female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
