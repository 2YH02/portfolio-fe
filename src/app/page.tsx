import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.yonghun.me" },
};

export const dynamic = "force-static";

export default function Home() {
  return <HomeClient />;
}
