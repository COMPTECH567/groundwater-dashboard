"use client";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./MapInner"), {
  ssr: false,
});

export default function Map() {
  return <MapWithNoSSR />;
}