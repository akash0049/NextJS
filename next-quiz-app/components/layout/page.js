import Head from "next/head";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { forwardRef } from "react";

const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Quizify`}</title>
      {meta}
    </Head>
    <Box sx={{ mx: "10%", mt: 10, mr: "10%" }} ref={ref} {...other}>
      <Card sx={{ border: 0.1, borderRadius: 2 }}>{children}</Card>
    </Box>
  </>
));

export default Page;
