import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { useFormik, FormikProvider, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { enGB } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';
import { BrowserRouter } from 'react-router-dom';
//import App from './App';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// function MyDropzone() {
//     const onDrop = useCallback(acceptedFiles => {
//       // Do something with the files
//     }, [])
//     const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
//     return (
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {
//           isDragActive ?
//             <p>Drop the files here ...</p> :
//             <p>Drag 'n' drop some files here, or click to select files</p>
//         }
//       </div>
//     )
// }

// const DatePickerExample = function () {
//     const [date, setDate] = useState()
//     return (
//         <DatePicker date={date} onDateChange={setDate} locale={enGB}>
//         {({ inputProps, focused }) => (
//             <input
//             id="date"
//             name="date"
//             className={'input' + (focused ? ' -focused' : '')}
//             {...inputProps}
//             />
//         )}
//         </DatePicker>
//     )
// }

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

const NewForm = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      department: '',
      email: '',
      phone: '',
      releasetype: '',
      purpose: '',
      product_category: '',
      manufacturer_and_model: '',
      uploadfile: ''
    },
    onSubmit: async (values) => {
      await sleep(500);
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
        firstname: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Must be less  than 20 characters')
        .required('First Name is required'),

        lastname: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Must be less  than 20 characters')
        .required('Last Name is required'),

        department: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Must be less  than 20 characters')
        .required('Department is required'),

        email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Enter valid email address'),

        phone: Yup.string(),
        purpose: Yup.string(),
    }),
  });

  return (
      <div className="main-container">
        <FormikProvider value={formik}>
            <h2>Technical hardware release for non-office devices</h2>
            <Form>
                <h3>Contact</h3>
                <TextInputLiveFeedback
                    label="First Name:"
                    id="firstname"
                    name="firstname"
                    type="text"
                    star="star"
                />
                <TextInputLiveFeedback
                    label="Last Name:"
                    id="lastname"
                    name="lastname"
                    type="text"
                    star="star"
                />
                <TextInputLiveFeedback
                    label="Department:"
                    id="department"
                    name="department"
                    type="text"
                    star="star"
                />
                <TextInputLiveFeedback
                    label="Email:"
                    id="email"
                    name="email"
                    type="email"
                    star="star"
                />
                <TextInputLiveFeedback
                    label="Telephone number:"
                    id="phone"
                    name="phone"
                    type="text"
                />
                <h3>Release Type</h3>
                <RadioInput 
                    id="release"
                    name="release"
                    helpText={["UseCase - release: ", <a href="">Release of new hardwware</a>, " - application-related", <br/>, 
                    "Pilot release - ", <a href="">Release of new hardware</a>, " - piloting/ Po C"]}
                />
                <h3>Use Purpose</h3>
                <Textarea 
                    helpText="Describe briefly the use case, name the application 
                              that is used and the business process. e.g. arrival, 
                              VZ2, office close production environment, paint shop, 
                              foundry …) for which the device is to be used."
                    id="purpose"
                    name="purpose"
                />
                <Select 
                    label="Product category:"
                    id="product_category"
                    name="product_category"
                    option={['Production / Industrial PCs', 'Mobile Clients/ Ruggedized tablets', 'MDE / Handheld', 'Barcode scanner', 
                    'IoT PC / Smart & Wearable Devices', 'WLAN Bridges / Client Adapter', 'Production printers', 'IP Camera']}
                />
                <TextInputLiveFeedback
                    label="Manufacturer and model:"
                    id="manufacturer_and_model"
                    name="manufacturer_and_model"
                    type="text"
                />
                {/* <MyDropzone /> */}
                {/* <TextInputLiveFeedback
                    label="App ID:"
                    id="app_id"
                    name="app_id"
                    type="text"
                /> */}
                {/* <DatePickerExample /> */}
                <FileUpload 
                    label="If you have technical documentation for your requirements, please upload the file:"
                    id="uploadfile"
                    name="uploadfile"
                    type="file"
                />
                <div className="btn-container">
                    <button type="submit" className="submit-btn">Submit</button>
                    <a href="/" className="cancel-btn">Cancel</a>
                </div>
                <div className="clearfix"></div>
            </Form>
        </FormikProvider>
    </div>
  );
};

export default NewForm;