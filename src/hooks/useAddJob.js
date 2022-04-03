import { useContext } from "react";
import { JobContext } from "../contexts/JobContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAddJob = (col) => {
  const { dispatch } = useContext(JobContext);
  const ref = collection(db, col);

  const addJob = async (job) => {
    try {
      const res = await addDoc(ref, { ...job });
      dispatch({ type: "ADD_JOB", payload: { ...job, id: res.id } });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addJob,
  };
};
