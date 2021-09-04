import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import { ArrowLeftIcon } from "@heroicons/react/outline";

import Input from "../../components/common/Input";
import FieldErrorMessage from "../../components/common/FieldErrorMessage";
import Button from "../../components/common/Button";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "Password should be minimum 8 characters")
    .required("This field is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>Login | Aprum</title>
      </Helmet>
      <main className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-80 md:w-96 space-y-6">
          <div className="space-y-14">
            <img
              className="w-2/3 mx-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            />
            <div className="flex items-center space-x-4">
              <ArrowLeftIcon className="w-3.5 h-3.5 mt-0.5 text-gray-100" />
              <p className="font-normal text-base text-gray-50">
                Return to{" "}
                <Link className="text-primary hover:underline" to="/">
                  aprum.rf.gd
                </Link>
              </p>
            </div>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => dispatch(loginUser(values, actions))}
          >
            {({ handleSubmit, isSubmitting, touched, errors }) => (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email"
                    as={Input}
                  />
                  {touched.email && errors.email && (
                    <FieldErrorMessage error={errors.email} />
                  )}
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    as={Input}
                  />
                  {touched.password && errors.password && (
                    <FieldErrorMessage error={errors.password} />
                  )}
                </div>
                <Button
                  className="bg-primary text-white"
                  loading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
                <p className="text-gray-50 font-normal">
                  Don't have an account yet?{" "}
                  <Link
                    className="text-primary hover:underline"
                    to="/auth/register"
                  >
                    Register
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
};

export default Login;
