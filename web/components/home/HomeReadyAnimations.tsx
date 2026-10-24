"use client";
import { useEffect, useState } from "react";
import HomeAnimationsRunner from "./HomeAnimationsRunner";
import HomeFxRunner from "./fx/HomeFxRunner";

export default function HomeReadyAnimations() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onReady = () => setReady(true);
    window.addEventListener("nps:home-ready", onReady);
    return () => window.removeEventListener("nps:home-ready", onReady);
  }, []);
  return ready ? <><HomeAnimationsRunner /><HomeFxRunner /></> : null;
}
