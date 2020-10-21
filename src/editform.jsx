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
                <label>{label}</label>
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

const EditForm = () => {
  const formik = useFormik({
    initialValues: {
      firstname: 'Kiril',
      lastname: 'Dimitrov',
      department: 'FG-222',
      email: 'kiril.dimitrov2@dxc.com',
      phone: '+359888 888 888',
      releasetype: 'pilot',
      purpose: `Describe briefly the use case, name the application that is used and the business process. e.g. arrival, VZ2, office close production environment, paint shop, foundry …) for which the device is to be used.`,
      product_category: 'IP Camera',
      manufacturer_and_model: 'Microsoft',
      uploadfile: '',
      appid: '2235.12',
      appowner: 'Kiril',
      whiichfg: 'FG-222',
      deviceinvolved: '5',
      specialenv: 'yes',
      techspec: 'no',
      netconn: 'Intercom',
      prodrespo: 'BMW',
      orderinsap: 'yes',
      lastedited: '10.03.2020',
      status: 'In progress',
      details: 'Application approved',
      processor: 'Thomas Bauer',
      notification: 'Lorem ipsum sit amet dot persole al akor',
      releaseresult: '',
      notificationinternal: '',
      notificationprovider: 'Bitte inen nessus scan durchfuhren. Danke!',
      jiraid: '1234.511',
      statusprovider: 'In progress',
      processorprovider: '',
      respoFG: 'test',

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
                label="For which purpose do you need the end device?"
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
                <TextInputLiveFeedback
                    label="App-ID:"
                    id="appid"
                    name="appid"
                    type="text"
                />
                <TextInputLiveFeedback
                    label="App Owner:"
                    id="appowner"
                    name="appowner"
                    type="text"
                />
                <TextInputLiveFeedback
                    label="Which FG bodies have already been contracted:"
                    id="whiichfg"
                    name="whiichfg"
                    type="text"
                />
                <TextInputLiveFeedback
                    label="How many devices are involved:"
                    id="deviceinvolved"
                    name="deviceinvolved"
                    type="text"
                />
                <Textarea 
                    label="Special system environment / operationg system / interfaces"
                    id="specialenv"
                    name="specialenv"
                />
                <Textarea 
                    label="Technical device specification:"
                    id="techspec"
                    name="techspec"
                />
                <TextInputLiveFeedback
                    label="Which network connection:"
                    id="netconn"
                    name="netconn"
                    type="text"
                />
                <TextInputLiveFeedback
                    label="Shoulde operational responsibility for FG:"
                    id="respoFG"
                    name="respoFG"
                    type="text"
                />
                <TextInputLiveFeedback
                    label="Product responsibility:"
                    id="prodrespo"
                    name="prodrespo"
                    type="text"
                />
                <TextInputLiveFeedback
                    label="Should the device be available for ordering in SAP (Bechtle catalogue)?"
                    id="orderinsap"
                    name="orderinsap"
                    type="text"
                />
                <h3>For internal use:</h3>
                <TextInputLiveFeedback
                    label="Last edited on:"
                    id="lastedited"
                    name="lastedited"
                    type="text"
                />
                <Select 
                    label="Status:"
                    id="status"
                    name="status"
                    option={['New', 'In progress', 'Paused', 'Completed']}
                />
                <Select 
                    label="Details:"
                    id="details"
                    name="details"
                    option={[' ', 'Application approved', 'Application denied', 'Forwarding to provider RST', 'Forwarding to provider Infrastructure', 'Forwarding to provider Client-Security', 'Implemented by the provider', 'Done']}
                />
                <TextInputLiveFeedback
                    label="Processor:"
                    id="processor"
                    name="processor"
                    type="text"
                />
                <Textarea 
                    label="Notification:"
                    id="notification"
                    name="notification"
                />                
                <Textarea 
                    label="Release result:"
                    id="releaseresult"
                    name="releaseresult"
                />
                <Textarea 
                    label="Notification internal:"
                    id="notificationinternal"
                    name="notificationinternal"
                />                
                <Textarea 
                    label="Notification to/from provider:"
                    id="notificationprovider"
                    name="notificationprovider"
                />
                <TextInputLiveFeedback
                    label="Jira-ID"
                    id="jiraid"
                    name="jiraid"
                    type="text"
                />                
                <Select 
                    label="Status provider:"
                    id="statusprovider"
                    name="statusprovider"
                    option={['New', 'In progress', 'Paused', 'Completed']}
                />
                <TextInputLiveFeedback
                    label="Processor provider:"
                    id="processorprovider"
                    name="processorprovider"
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
                    label="Attachments:"
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

export default EditForm;