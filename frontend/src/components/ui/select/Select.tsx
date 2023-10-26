import React from "react";
import Spinner from "@/components/ui/spinner";

const Select = (props: any) => {
  const {
    name,
    color,
    label = "",
    placeholder = "Select",
    options,
    className = "",
    loading = false,
    value = "",
    onChange = () => {
    }
  } = props;

  let wrapClasses = `pl-2 py-1 inline-flex flex-row items-center gap-1 ${className}`;
  switch (color) {
    case "info":
      wrapClasses = `${wrapClasses} bg-blue-100`;
      break;
    default:
      wrapClasses = `${wrapClasses} bg-gray-100 `;
  }

  return (
    <div className={wrapClasses}>
      {label && <label>{label}</label>}
      {!loading && options && (
        <select
          name={name}
          onChange={onChange}
          value={value}
          required
          className="text-[1em] bg-transparent border-0 py-0 pl-1 pr-8 font-semibold invalid:text-[0.95em] invalid:text-gray-300 invalid:font-normal focus:outline-none focus:ring-0"
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((item: any) => (
            <option className="text-gray-900 py-2" key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      )}
      {loading && <Spinner isSpining={loading} />}
    </div>
  );
};

export default Select;
