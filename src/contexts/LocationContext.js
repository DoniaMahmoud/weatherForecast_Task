import { createContext, useState } from "react";

export const LocationContext = createContext({
  countryContext: null,
  setCountryContext: () => null,
  stateContext: null,
  setStateContext: () => null,
});

export const LocationProvider = ({ children }) => {
  const [countryContext, setCountryContext] = useState(null);
  const [stateContext, setStateContext] = useState(null);
  const value = {
    countryContext,
    setCountryContext,
    stateContext,
    setStateContext,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
