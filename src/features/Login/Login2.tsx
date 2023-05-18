import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email: string,
    password: string,
    rememberMe: boolean
};



export const Login2 = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        reset({ password: '', email: '' })
    }

    const validateEmail = (value: string) => {
        if (!value) return 'email required'
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return 'Invalid email'
    }

    const validatePassword = (value: string) => {
        if (value.length < 3) return 'password must be more than 3 characters'
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...register("email", { validate: validateEmail })}

                        />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                        <TextField type="password" label="Password"
                            margin="normal"
                            {...register("password", { validate: validatePassword })}
                        />
                        {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox />} {...register("rememberMe")} />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}


