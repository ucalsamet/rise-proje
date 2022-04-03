import { db } from "../firebase/config";
import { doc, updateDoc } from "@firebase/firestore";
import { JobContext } from "../contexts/JobContext";
import { useContext } from "react";

export const useUpdate = (col) => {
  const { dispatch } = useContext(JobContext);
  const handleUpdate = async (id, jobPriority, jobName) => {
    let ref = doc(db, col, id);
    const newJob = { jobName: jobName, jobPriority: jobPriority };
    await updateDoc(ref, newJob);

    dispatch({
      type: "JOB_UPDATE",
      payload: { id: id, jobPriority: jobPriority, jobName: jobName },
    });
  };

  return {
    handleUpdate,
  };
};
