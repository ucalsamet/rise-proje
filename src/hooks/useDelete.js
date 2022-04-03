import { db } from "../firebase/config";
import { doc, deleteDoc } from "@firebase/firestore";
import { JobContext } from "../contexts/JobContext";
import { useContext } from "react";

export const useDelete = (col) => {
  const { dispatch } = useContext(JobContext);
  const handleDelete = async (id) => {
    let ref = doc(db, col, id);
    await deleteDoc(ref);
    dispatch({ type: "JOB_DELETE", id });
  };

  return {
    handleDelete,
  };
};
