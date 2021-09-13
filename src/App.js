import { Suspense } from "react";
import Side from "./Side";
import Layout from "./Components/Layout";

export default function Home() {
  return (
    <Layout>
      <Suspense fallback="">
        <Side />
      </Suspense>
    </Layout>
  );
}
