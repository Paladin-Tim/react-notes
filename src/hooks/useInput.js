import { useState } from "react";

export const useInput = (defaultVal = "") => {
  const [value, setValue] = useState(defaultVal);

  return {
    value,
    onChange: (event) => setValue(event.target.value),
    clear: () => setValue(defaultVal),
  };
};
