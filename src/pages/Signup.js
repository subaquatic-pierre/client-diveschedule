import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {
    Card,
    Button,
    Typography,
    FormControl,
    Grid,
    FormLabel,
    TextField,
} from '@material-ui/core';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/Loading';
import Alert from '../components/Alert';

const CREATE_USER = gql`
    mutation CreateUser(
        $email: String!,
        $username: String!,
        $password: String!
    ) {
        createUser(
            email:$email,
            username:$username,
            password:$password
        ) {
            user {
                username
                email
            }
        }
    }
`

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '2rem 0',
        padding: '2rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInput: {
        marginTop: '2rem'
    },
    button: {
        marginTop: '2rem',
        display: 'block'
    }
}));

const Signup = (props) => {
    const { error, loading, token } = props
    const [createUser] = useMutation(CREATE_USER)
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password1, setPassword1] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const classes = useStyles()

    const handleTextChange = (event, id) => {
        switch (id) {
            case 'email':
                return setEmail(event.target.value)
            case 'username':
                return setUsername(event.target.value)
            case 'password1':
                return setPassword1(event.target.value)
            case 'password2':
                return setPassword2(event.target.value)
            default:
                console.log('Error')
        }
    }

    const handleClick = () => {
        createUser({
            variables: {
                username: username,
                email: email,
                password: password1
            }
        })
            .then(res => {
                console.log(res)
                props.history.push('/login')
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (token) {
            if (token) {
                props.history.push('/')
            }
        }
    }, [token, props.history])

    return (
        <>
            <Typography variant='h1'>Login</Typography>
            <Grid container jutify='center'>
                <Grid item sm={6}>
                    <Card className={classes.card}>
                        {loading ? <Loading />
                            :
                            error ?
                                <div>
                                    <Alert severity="error">{error.message}</Alert>
                                </div>
                                :
                                <form className={classes.form} noValidate autoComplete='off'>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Login:</FormLabel>
                                        <TextField
                                            label="Username"
                                            className={classes.textInput}
                                            id="username" value={username}
                                            onChange={(event, id) => handleTextChange(event, 'username')}
                                        />
                                        <TextField
                                            label="Email"
                                            className={classes.textInput}
                                            id="email" value={email}
                                            onChange={(event, id) => handleTextChange(event, 'email')}
                                        />
                                        <TextField
                                            className={classes.textInput}
                                            id="password1"
                                            value={password1}
                                            onChange={(event, id) => handleTextChange(event, 'password1')}
                                            label="Password"
                                            type="password" />
                                        <TextField
                                            className={classes.textInput}
                                            id="password2"
                                            value={password2}
                                            onChange={(event, id) => handleTextChange(event, 'password2')}
                                            label="Confirm password"
                                            type="password" />
                                    </FormControl>
                                    <Button
                                        className={classes.button}
                                        variant='contained'
                                        color='primary'
                                        onClick={handleClick}>Signup</Button>
                                </form>
                        }
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default withRouter(Signup);