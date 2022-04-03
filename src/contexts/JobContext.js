import { createContext, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "@firebase/firestore";
export const JobContext = createContext();

export const jobReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOB":
      return (state = action.payload);
    case "ADD_JOB":
      return [
        ...state,
        {
          jobName: action.payload.jobName,
          jobPriority: action.payload.jobPriority,
          id: action.payload.id,
        },
      ];
    case "JOB_UPDATE":
      return [
        ...state.map((job) =>
          job.id === action.payload.id ? action.payload : job
        ),
      ];
    case "JOB_DELETE":
      return state.filter((job) => job.id !== action.id);
    default:
      return state;
  }
};

export const JobContextProvider = ({ children }) => {
  const [jobs, dispatch] = useReducer(jobReducer, []);
  useEffect(() => {
    const getJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      dispatch({ type: "SET_JOB", payload: data });
    };
    getJobs();
  }, []);
  return (
    <JobContext.Provider value={{ jobs, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
