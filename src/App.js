import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [values, setValues] = useState({});
  const [valid, setValid] = useState(false);
  const [typeMismatch, setTypeMistmatch] = useState(false);
  const [errors, setErrors] = useState([]);
  const [allValid, setAllValid] = useState(false);
  const [formElementsTouched, setFormElementsTouched] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Submit handler
  }

  const handleInput = (e) => {
    const target = e.target;
    const value = target.value;
    const prop = target.name;

    setValues(oldValues => {
      return {...oldValues, [prop]: value }
    });    
  }

  const validateField = (e) => {
    console.log('Validating...');
    if (!formElementsTouched.includes(e.target.name)) {
      setFormElementsTouched(oldValues => {
        return [...oldValues, e.target.name];
      });
    }

    e.target.setCustomValidity('');
    let valid = e.target.checkValidity();
    console.log('Got value: ', e.target.value)
    console.log('Field valid?', valid);
    setValid(valid);
    if (!valid && e.target.value.length > 0) {
      e.target.setCustomValidity('Letters only!');
    }

    if(!valid && e.target.value.length === 0) {
      e.target.setCustomValidity('Can not be blank.');
    }

    console.log(e.target.validationMessage);
    setErrors(e.target.validationMessage);
  }

  const renderError = () => {
    if (!valid && formElementsTouched.includes('name')) {
      return(
        <>
          <p>{errors}</p>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name: 
          <input className={!valid ? 'error' : 'pass'} type="text" name="name" value={values['name'] || ''} onBlur={ (event) => {validateField(event) }} onChange={handleInput} required={true} pattern="[a-zA-Z]+" />
          { renderError() }
        </label>
      </form>

      <p>Current input: {values['name']}</p>
    </div>
  );
}

export default App;
