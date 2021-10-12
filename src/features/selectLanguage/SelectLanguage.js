import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import {
  setCurrentLanguage,
  selectCurrentLanguage,
} from './selectLanguageSlice';


export function SelectLanguage() {
  const lan = useSelector(selectCurrentLanguage);
  const options = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
  ];
  const selectedOption = options.find((e) => e.value === lan);
  const [language, setLanguage] = useState(selectedOption);
  const dispatch = useDispatch();
  
  const handleChange = (selectedOption) => {
    setLanguage(selectedOption);
    dispatch(setCurrentLanguage(selectedOption.value))
  };
  return (
    <div>
      <Select
        value={language}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
