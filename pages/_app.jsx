import "../styles/global.css";
import { AuthProvider } from "../context/auth_context";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
