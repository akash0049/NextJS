import Page from '@/components/layout/page'
import LoginForm from '@/components/login/login_form'
import WelcomeText from '@/components/login/welcome_text'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth_context'

const SignUp = () => {
    const router = useRouter();
    const { currentUser, signUp } = useAuth();


    useEffect(() => {
        if (currentUser) {
            router.replace("/user_profile");
        }
    }, [currentUser])

    return (
        <Page title="SignUp">
            <Box>
                <Grid container sx={{ display: 'flex', justifyContent: "center" }}>
                    <Grid item lg={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                        <WelcomeText />
                    </Grid>
                    <Grid item lg={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                        <LoginForm signUp={signUp} />
                    </Grid>
                </Grid>
            </Box>
        </Page>
    )
}

export default SignUp