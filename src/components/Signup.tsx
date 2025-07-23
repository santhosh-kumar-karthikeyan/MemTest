import { useState } from "react";
import { signIn, signUp } from "../utilities";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstVisit, setFirstVisit] = useState<boolean>(true);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmation: "",
    },
    validate: validate,
    onSubmit: authenticate,
  });
  function toggleFirstVisit() {
    setFirstVisit((visit) => !visit);
    formik.setErrors({});
    formik.setTouched({});
  }
  function validate(values) {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmation?: string;
    } = {};
    if (!values.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errors.email = "Please enter a valid email";
    if (!values.username) errors.username = "Username is required";
    else if (values.username.length > 15)
      errors.username = "Username can't be longer than 15 characters";
    if (!values.password) errors.password = "Password is required";
    else if (values.password.length <= 3)
      errors.password = "Password cannot be less than 4 characters.";
    if (firstVisit && !values.confirmation)
      errors.confirmation = "Retype your password";
    if (firstVisit && values.password !== values.confirmation)
      errors.confirmation =
        "Retyped password doesn't match the original password";
    return errors;
  }
  async function authenticate(values) {
    console.table(values);
    if (firstVisit) {
      const { error } = await signUp(
        values.email,
        values.username,
        values.password
      );
      console.log("Authenticated");
      if (error) formik.errors.email = String(error);
    } else signIn(values.email, values.password);
    navigate("/");
  }
  return (
    <main className="absolute w-screen h-screen flex flex-col justify-center items-center p-5 ">
      <section className="bg-zinc-100 p-10 min-w-lg min-h-1/2 space-y-5 rounded-3xl hover:scale-101">
        <header className="flex justify-center items-center gap-5 rounded-sm p-2">
          <section className="bg-zinc-200 p-x-2 rounded-xl">
            <button
              className={`${
                firstVisit && "bg-sky-600 text-sky-100"
              } rounded-xl p-3 hover:scale-110 active:scale-95`}
              onClick={toggleFirstVisit}>
              Signup
            </button>
            <button
              className={`${
                !firstVisit && "bg-sky-600 text-sky-100"
              } rounded-xl p-3 hover:scale-110 active:scale-95`}
              onClick={toggleFirstVisit}>
              Signin
            </button>
          </section>
        </header>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center gap-3 bg-zinc-100 p-3">
          <fieldset className="flex flex-col justify-center gap-5  p-3 rounded-xl">
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="someone@example.com"
              className="bg-zinc-200 rounded-md p-3"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-red-500">
                {String(formik.errors.email)}
              </small>
            )}
          </fieldset>
          {firstVisit && (
            <fieldset className="flex flex-col justify-center gap-5 p-3 rounded-xl">
              <legend>Username</legend>
              <input
                className="bg-zinc-200 p-3 rounded-md"
                type="text"
                id="username"
                name="username"
                placeholder="user"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <small className="text-red-500">
                  {String(formik.errors.username)}
                </small>
              )}
            </fieldset>
          )}
          <fieldset className="flex flex-col justify-center gap-5 p-3 rounded-xl">
            <legend>Password</legend>
            <input
              className="bg-zinc-200 rounded-md p-3"
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder={
                firstVisit ? "Enter a strong password" : "Enter your password"
              }
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-red-500">
                {String(formik.errors.password)}
              </small>
            )}
          </fieldset>
          {firstVisit && (
            <fieldset className="flex flex-col justify-center gap-5 rounded-xl p-3">
              <legend>Confirm Password</legend>
              <input
                className="bg-zinc-200 rounded-md p-3"
                type="password"
                name="confirmation"
                id="confirmation"
                placeholder="Confirm your password"
                value={formik.values.confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmation && formik.errors.confirmation ? (
                <small className="text-red-500">
                  {String(formik.errors.confirmation)}
                </small>
              ) : null}
            </fieldset>
          )}
          <section className="flex items-center justify-center w-full space-x-10">
            <button
              type="submit"
              className="bg-zinc-800 rounded-md text-zinc-100 p-3 hover:scale-105 hover:bg-zinc-900 active:scale-95">
              {firstVisit ? "Signup" : "Login"}
            </button>
            <button
              type="button"
              className="bg-sky-600 rounded-md text-zinc-100 p-3 hover:scale-105 hover:bg-sky-700">
              {firstVisit ? "Signup with Google" : "Login with Google"}
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}
