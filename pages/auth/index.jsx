import Page from '@/components/layout/page'
import LoginForm from '@/components/login/login_form'
import WelcomeText from '@/components/login/welcome_text'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth_context'

const Login = () => {
    const router = useRouter();
    const { currentUser, login } = useAuth();


    useEffect(() => {
        if (currentUser) {
            router.replace("/user_profile");
        }
    }, [currentUser])

    return (
        <Page title="Login">
            <Box>
                <Grid container sx={{ display: 'flex', justifyContent: "center" }}>
                    <Grid item lg={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                        <WelcomeText action="Login" />
                    </Grid>
                    <Grid item lg={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                        <LoginForm action={"Login"} login={login} />
                    </Grid>
                </Grid>
            </Box>
        </Page>
    )
}

export default Login;