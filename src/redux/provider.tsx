"use client";
import { Provider } from "react-redux";
import { store } from "./store";

type ProvidersType = {
  children: React.ReactNode,
}

const Providers = ({ children }: ProvidersType ) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Providers;