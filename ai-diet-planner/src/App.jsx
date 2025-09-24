import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { dietPrompt } from "./utils/prompt";
import useDiet from "./hooks/useDiet";

const App = () => {
  const [form, setForm] = useState();

  const {loading, result, getDiet, error} = useDiet()

  const valueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createDiet = async (e) => {
    e.preventDefault();
    
    


  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="w-10/12 mx-auto flex gap-10 py-16">
        <div className="bg-slate-800 rounded-lg border-2 border-slate-600 w-md p-10">
          <h1 className="text-4xl font-bold text-white">AI Diet Planner</h1>

          <form className="flex flex-col gap-6 mt-6" onSubmit={createDiet}>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="bg-slate-600 rounded p-2 placeholder-slate-300 text-white"
              onChange={valueChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              className="bg-slate-600 rounded p-2 placeholder-slate-300 text-white"
              onChange={valueChange}
              required
            />
            <select
              name="medical"
              className="bg-slate-600 rounded p-2 text-white"
              onChange={valueChange}
              required
            >
              <option value="throide">Throide</option>
              <option value="high bp">High BP</option>
              <option value="low bp">Low BP</option>
              <option value="diebete">Diebete</option>
            </select>

            <button
              disabled= {loading}
              className="w-fit rounded py-2 px-4 bg-indigo-500 text-white active:scale-90 duration-200 cursor-pointer"
              type="submit w-fit"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg border-2 border-slate-600 flex-1 p-10">  
          <div dangerouslySetInnerHTML={{__html: result.replaceAll('```html', '').replaceAll('```', '')}}></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
