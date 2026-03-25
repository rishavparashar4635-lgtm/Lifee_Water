import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "motion/react";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <LazyMotion features={domAnimation} strict>
    <App />
  </LazyMotion>
);
