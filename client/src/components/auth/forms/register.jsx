import { useForm } from '@tanstack/react-form';

const Register = () => {
  const form = useForm({
    onSubmit: async (values) => {
      // Implementar lógica de registro
      console.log(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <label>Email</label>
        <input {...form.register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...form.register('password')} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
