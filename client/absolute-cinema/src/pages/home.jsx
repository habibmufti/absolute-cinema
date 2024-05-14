import { useEffect } from "react";
import Card from "../components/card";


export default function Home(){
  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = "SB-Mid-client-3eQblZ3THHraZdrF";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // Then somewhere else on your React component, `window.snap` global object will be available to use
  // e.g. you can then call `window.snap.pay( ... )` function.
  return (
    <div>
      <h1 className="text-5xl text-center mb-4">Now Playing</h1>
      <Card />
    </div>
  );
}