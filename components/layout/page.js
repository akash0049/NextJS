import Head from "next/head";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const Page = ({ children, title = "" }) => (
  <>
    <Head>
      <title>{`${title} | Quizify`}</title>
    </Head>
    <Box sx={{ mx: "10%", mt: 10, mr: "10%" }} >
      <Card sx={{ border: 0.1, borderRadius: 2 }}>{children}</Card>
    </Box>
  </>
);

export default Page;
