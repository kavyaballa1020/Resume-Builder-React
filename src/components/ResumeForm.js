import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ResumeForm.css';

const ResumeForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'),
    education: Yup.string().required('Required'),
    experience: Yup.string().required('Required'),
    skills: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    linkedin: Yup.string().url('Invalid URL'),
    github: Yup.string().url('Invalid URL'),
    project: Yup.string().required('Required')
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
        address: '',
        linkedin: '',
        github: '',
        project: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form className="resume-form">
          <div>
            <label>Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label>Phone</label>
            <Field name="phone" type="text" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>
          <div>
            <label>Education</label>
            <Field name="education" type="text" />
            <ErrorMessage name="education" component="div" className="error" />
          </div>
          <div>
            <label>Experience</label>
            <Field name="experience" type="text" />
            <ErrorMessage name="experience" component="div" className="error" />
          </div>
          <div>
            <label>Skills</label>
            <Field name="skills" type="text" />
            <ErrorMessage name="skills" component="div" className="error" />
          </div>
          <div>
            <label>Address</label>
            <Field name="address" type="text" />
            <ErrorMessage name="address" component="div" className="error" />
          </div>
          <div>
            <label>LinkedIn</label>
            <Field name="linkedin" type="url" />
            <ErrorMessage name="linkedin" component="div" className="error" />
          </div>
          <div>
            <label>GitHub</label>
            <Field name="github" type="url" />
            <ErrorMessage name="github" component="div" className="error" />
          </div>
          <div>
            <label>Project</label>
            <Field name="project" type="text" />
            <ErrorMessage name="project" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default ResumeForm;
