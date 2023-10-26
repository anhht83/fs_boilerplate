import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CheckboxGroupContextProvider } from "./context";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";
import { shallowEqual } from "../../../utils/helpers";

const Group = React.forwardRef((props: any, ref) => {
  const {
    value: valueProp,
    className,
    onChange,
    color,
    vertical = false,
    name,
    children,
    ...rest
  } = props;

  const [value, setValue] = useState(valueProp);

  const onCheckboxGroupChange = useCallback(
    (itemValue: any, itemChecked: any, event: any) => {
      const nextValue = cloneDeep(value) || [];
      if (itemChecked) {
        nextValue.push(itemValue);
      } else {
        remove(nextValue, (i) => shallowEqual(i, itemValue));
      }

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [onChange, setValue, value]
  );

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const checkboxGroupDefaultClass = `inline-flex ${
    vertical ? "flex-col gap-y-2" : ""
  }`;

  const checkBoxGroupClass = `${checkboxGroupDefaultClass} ${className}`;

  const contextValue = useMemo(
    () => ({
      vertical,
      name,
      value,
      color,
      onChange: onCheckboxGroupChange
    }),
    [vertical, onCheckboxGroupChange, name, color, value]
  );

  return (
    <CheckboxGroupContextProvider value={contextValue}>
      <div ref={ref} className={checkBoxGroupClass} {...rest}>
        {children}
      </div>
    </CheckboxGroupContextProvider>
  );
});

export default Group;
