import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { AppState } from "../store";
import { logout } from "../store/actions/userAction";
import { motion } from "framer-motion";

const Logout = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!data.username) {
    return <Redirect to='/' />;
  }

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      Logging out
    </motion.div>
  );
};

export default Logout;
