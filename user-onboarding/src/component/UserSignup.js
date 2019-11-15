import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from "formik"
import * as Yup from "yup";
import axios from "axios";


const UserSignup = ({ values, errors, touched, status } ) => {
    const [user, setUser] = useState([]);
  


    useEffect(() => {
    status && setUser(user => [...user, status]);
    }, [status]);

    return (
        <div>
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <Field type="text" name="password" placeholder="password" /> 
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}

                <label> Accept Terms of Service
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    {errors.tos && (
                    <p>{errors.tos}</p>
                )}
                </label>

                <button>Register</button>
            </Form>
            {user.map(user => (
                <div className='userlist' key={user.id}>
                    <h1>User List </h1>
                    <div className='user'>
                        <p>User: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: ******** </p>
                    </div>
                </div>
            ))}

        </div>


    )

}

const FormikUserSignup = withFormik({


    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required().min(2, 'Too short!').max(50, 'Too Long!'),
        email: Yup.string().required().email('Invalid email'),
        password: Yup.string().required().min(2, 'Too short!').max(50, 'Too Long!'),
        tos: Yup.boolean().oneOf([true], 'Must accept Terms and Conditions')
        
    }),
    handleSubmit(values, {setStatus}, setUserList) {
        axios
        .post("https://reqres.in/api/users", values)
        .then(response => {
            setStatus(response.data);
            console.log(response);
        })
        .catch(err => console.log(err.response));
    }
})(UserSignup);

export default FormikUserSignup;