import { Form, Field, Debug } from '@tanstack/react-form';

const Login = () => {
  return (
    <Form
      onSubmit={async (values) => {
        console.log('Login Data:', values);
        // Implementar lógica de login aquí
      }}
      initialValues={{
        email: '',
        password: '',
      }}
      render={({ submit }) => (
        <form onSubmit={submit}>
          <div>
            <label>Email</label>
            <Field name="email">
              {({ inputProps }) => <input type="email" {...inputProps} />}
            </Field>
          </div>
          <div>
            <label>Password</label>
            <Field name="password">
              {({ inputProps }) => <input type="password" {...inputProps} />}
            </Field>
          </div>
          <button type="submit">Login</button>
          <Debug />
        </form>
      )}
    />
  );
};

export default Login;
