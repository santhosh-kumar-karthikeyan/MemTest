import { useState } from "react";

export default function Signup() {
  const [firstVisit, setFirstVisit] = useState<boolean>(true);
  function toggleFirstVisit() {
    setFirstVisit((visit) => !visit);
  }
  return (
    <main className="absolute w-screen h-screen flex flex-col justify-center items-center p-5 ">
      <section className="bg-zinc-100 p-10 min-w-lg min-h-1/2 space-y-5 rounded-3xl hover:scale-101">
        <header className="flex justify-center items-center gap-5 rounded-sm p-2">
          <section className="bg-zinc-200 p-x-2 rounded-xl">
            <button
              className={`${firstVisit && "bg-sky-600 text-sky-100"} rounded-xl p-3 hover:scale-110 active:scale-95`}
              onClick={toggleFirstVisit}>
              Signup
            </button>
            <button
              className={`${!firstVisit && "bg-sky-600 text-sky-100"} rounded-xl p-3 hover:scale-110 active:scale-95`}
              onClick={toggleFirstVisit}>
              Signin
            </button>
          </section>
        </header>
        <form
          action=""
          className="flex flex-col justify-center gap-3 bg-zinc-100 p-3">
          <fieldset className="flex flex-col justify-center gap-5  p-3 rounded-xl">
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="someone@example.com"
              className="bg-zinc-200 rounded-md p-3"
            />
          </fieldset>
          <fieldset className="flex flex-col justify-center gap-5 p-3 rounded-xl">
            <legend>Username</legend>
            <input
              className="bg-zinc-200 p-3 rounded-md"
              type="text"
              id="username"
              name="username"
              placeholder="user"
            />
          </fieldset>
          <fieldset className="flex flex-col justify-center gap-5 p-3 rounded-xl">
            <legend>Password</legend>
            <input
              className="bg-zinc-200 rounded-md p-3"
              type="password"
              name="password"
              id="password"
              placeholder={
                firstVisit ? "Enter a strong password" : "Enter your password"
              }
            />
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
              />
            </fieldset>
          )}
          <section className="flex items-center justify-center w-full space-x-10">
            <button className="bg-zinc-900 rounded-md text-zinc-100 p-3">
              {firstVisit ? "Signup" : "Login"}
            </button>
            <button className="bg-blue-500/90 rounded-md text-zinc-100 p-3">
              {firstVisit ? "Signup with Google" : "Login with Google"}
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}
