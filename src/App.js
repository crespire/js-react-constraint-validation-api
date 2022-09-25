import React, { useState, useRef } from 'react';

function App() {
  const [values, setValues] = useState({});
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formElementsTouched, setFormElementsTouched] = useState([]);

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
    }
  }

  return (
    <div className="container mx-auto p-2">
      <form className="space-4 invalid:border-2 invalid:border-black">
        <label htmlFor="email">Email: 
          <input className="invalid:border-2 invalid:border-rose-500" type="email" name="email" placeholder="user@example.com" value={values['email'] || ''} onBlur={ (event) => {validateField(event) }} onChange={handleInput} required={true} pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
          { renderError() }
        </label>
      </form>

      <p>Current input: {values['name']}</p>
    </div>
  );
}

export default App;
