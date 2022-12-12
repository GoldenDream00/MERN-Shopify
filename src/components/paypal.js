import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const PaypalIntegration = ({ amount, plantoken, ispackage }) => {
  const { user, setUserData } = useContext(AuthContext);
  const userId = user.user._id;
  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: plantoken,
    });
  };

  const onApprove = (data, actions) => {
    return actions.subscription.get().then(function (details) {
      addpackage();
    });
  };
  const addpackage = async () => {
    await axios.put(process.env.REACT_APP_API + "/api/users/" + userId, {
      ispackage: ispackage,
    });
    const result = await axios.get(
      process.env.REACT_APP_API + "/api/users/" + userId
    );
    const token = localStorage.getItem("auth-token");
    setUserData({
      token,
      user: result.data,
    });
    toast("success");
  };

  return (
    <div style={{ minWidth: "300px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AQIn2QFJ1LFeTeIEc3ZT3vIWcOj46dyimYS8GQpqUzXb6TGdKPoPCsVhxbx_kDa4bp6MLpG-gQMA9oMs",
          vault: true,
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createSubscription={createSubscription}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalIntegration;
