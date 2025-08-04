import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect } from 'vitest';
import CustomInput from '../CustomInput';


const RenderWithForm = ({
  name,
  label,
  placeholder,
  rules,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
}) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <CustomInput
          name={name}
          control={methods.control}
          label={label}
          placeholder={placeholder}
          rules={rules}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('CustomInput', () => {
  it('renders with label and placeholder', () => {
    render(
      <RenderWithForm name="email" label="Email" placeholder="Enter email" />
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('shows required asterisk if rules.required is passed', () => {
    render(
      <RenderWithForm
        name="email"
        label="Email"
        placeholder="Email"
        rules={{ required: 'Email is required' }}
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays validation error on submit', async () => {
    const user = userEvent.setup();

    render(
      <RenderWithForm
        name="email"
        label="Email"
        placeholder="Enter email"
        rules={{ required: 'Email is required' }}
      />
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();

    render(
      <RenderWithForm
        name="username"
        label="Username"
        placeholder="Enter your username"
      />
    );

    const input = screen.getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;

    await user.type(input, 'Mokshith');
    expect(input.value).toBe('Mokshith');
  });
});
