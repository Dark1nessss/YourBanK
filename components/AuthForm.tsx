'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { authFormSchema } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomInput from './CustomInput';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type, user }: { type: string; user?: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectInitiated, setRedirectInitiated] = useState(false);
  const [signedUpUser, setSignedUpUser] = useState<User | null>(null); // Add this state

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (redirectInitiated) return;

    setErrorMessage('');
    setIsLoading(true);

    try {
      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);

        if (newUser) {
          console.log('Signup successful, user:', newUser.user);
          setSignedUpUser(newUser.user); // Set the user to show PlaidLink
          setIsLoading(false); // Stop loading to show PlaidLink
          return;
        }
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          setRedirectInitiated(true);
          router.push('/dashboard');
          return;
        }
      }
    } catch (error) {
      console.error('Auth error:', error);

      let errorMsg = 'An unexpected error occurred.';

      if (error instanceof Error) {
        if (error.message.includes('User not found')) {
          errorMsg = 'No account found with this email address.';
        } else if (error.message.includes('Invalid credentials')) {
          errorMsg = 'Invalid email or password.';
        } else if (error.message.includes('User already exists')) {
          errorMsg = 'An account with this email already exists.';
        } else {
          errorMsg = error.message
            .replace('Failed to sign up: ', '')
            .replace('Failed to sign in: ', '');
        }
      }

      setErrorMessage(errorMsg);
    } finally {
      if (type === 'sign-in') {
        setIsLoading(false);
      }
    }
  };

  // Show PlaidLink if user signed up successfully or if user prop is passed
  const currentUser = user || signedUpUser;

  return (
    <section className="auth-form relative">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="YourBanK logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-green-700">
            YourBanK
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {currentUser
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {currentUser
              ? 'Link your account to get started'
              : 'Please enter your details'}
          </p>
        </div>
      </header>

      {currentUser ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={currentUser} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="form-link"
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
      {/* Only show loading overlay for sign-in, not for sign-up after user is set */}
      {(isLoading && !signedUpUser) ||
        (redirectInitiated && (
          <div className="absolute inset-0 z-50 flex items-center justify-center transition-all duration-300 backdrop-blur-[.8px] backdrop-filter">
            <div className="flex flex-col items-center space-y-4">
              <Loader size={64} className="animate-spin text-green-700" />
              <span className="text-green-700 text-lg font-semibold inline-flex items-center">
                Please wait
                <span className="ml-1 inline-flex">
                  <span
                    className="dot inline-block animate-ellipsis text-xl"
                    style={{ animationDelay: '0s' }}
                  >
                    .
                  </span>
                  <span
                    className="dot inline-block animate-ellipsis text-xl"
                    style={{ animationDelay: '0.2s' }}
                  >
                    .
                  </span>
                  <span
                    className="dot inline-block animate-ellipsis text-xl"
                    style={{ animationDelay: '0.4s' }}
                  >
                    .
                  </span>
                </span>
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};

export default AuthForm;
