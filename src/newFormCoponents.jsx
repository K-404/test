import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { useFormik, FormikProvider, Form, useField, Field, Formik } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { enGB } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Select = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
      (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div className="form-control flexbox">
            <div className="child-flex left">
                <label>{label}</label>
            </div>
            <div className="child-flex right">
                <Field 
                    as="select"
                    {...props}
                    {...field}
                >
                    {props.option.map((x, y) => <option value={x} key={x}>{x}</option>)}
                </Field>
            </div>
        </div>
    )
}
export default Select;

const RadioInput = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
      (!!didFocus && field.value.trim().length > 2) || meta.touched;
  
    return (
        <div className="form-control flexbox">
            <div className="child-flex left flex--top">
                <label>Release type:<span className="req-star">*</span></label>
            </div>
            <div className="child-flex right">
                <label>
                    <Field type="radio" name="releasetype" value="release"/>
                    Use Case - Release
                </label>
                <label>
                    <Field type="radio" name="releasetype" value="pilot"/>
                    Pilot - Release
                </label>
                <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
                    {helpText}
                </div>
            </div>
        </div>
    )
}
export default RadioInput;

const Textarea = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
      (!!didFocus && field.value.trim().length > 2) || meta.touched;
  
    return (
        <div className={`form-control flexbox ${
            showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
          }`}>
            <div className="child-flex left flex--top">
                <label>For which purpose do you need the end device?</label>
                <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
                    {helpText}
                </div>
            </div>
            <div className="child-flex right">
                <textarea 
                {...props}
                {...field}
                className="textarea-height" 
                name={props.name} 
                placeholder={props.placeholder}
                onFocus={handleFocus}>
                </textarea>
            </div>
        </div>
    )
}
export default Textarea;

const FileUpload = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
      (!!didFocus && field.value.trim().length > 2) || meta.touched;
  
    return (
        <div className={`form-control flexbox ${
            showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
          }`}>
            <div className="child-flex left">
                <label>{label}</label>
                <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
                    {helpText}
                </div>
            </div>
            <div className="child-flex right">
                <input 
                {...props}
                {...field}
                name={props.name} 
                placeholder={props.placeholder}
                onFocus={handleFocus}/>
            </div>
        </div>
    )
}
export default FileUpload;

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);

  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={`form-control flexbox ${
        showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
      }`}
    >
      <div className="child-flex left">
        <label htmlFor={props.id}>{label}<span className="req-star">{props.star ? '*' : ''}</span></label>{' '}
        <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
            {helpText}
        </div>
 
      </div>
      <div className="child-flex right">
        <input
            {...props}
            {...field}
            aria-describedby={`${props.id}-feedback ${props.id}-help`}
            onFocus={handleFocus}
        />
        {props.radioText ? (
            <span>{props.radioText}</span>
        ) : null}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm feedback-size"
          >
            {meta.error ? meta.error : ''}
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default TextInputLiveFeedback;