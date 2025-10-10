import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link';
import { Button } from './ui/button';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch link token when component mounts
  useEffect(() => {
    const fetchLinkToken = async () => {
      if (!user) {
        setError('User not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('Creating link token for user:', user);

        // Ensure user has proper ID format
        const userWithId = {
          ...user,
          _id: user._id,
        };

        if (!userWithId._id) {
          throw new Error('User ID not found');
        }

        const response = await createLinkToken(
          userWithId as User & { _id: string }
        );

        if (response?.linkToken) {
          setLinkToken(response.linkToken);
        } else {
          throw new Error('No link token received');
        }
      } catch (err) {
        console.error('Failed to create link token:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to create link token'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        console.log('Plaid Link success, exchanging token...');

        // Ensure user has proper ID format
        const userWithId = {
          ...user,
          _id: user._id,
        };

        if (!userWithId._id) {
          throw new Error('User missing required ID for token exchange');
        }

        // Note: dwollaCustomerId is optional now
        console.log(
          'User has Dwolla customer ID:',
          !!userWithId.dwollaCustomerId
        );

        await exchangePublicToken({
          publicToken: public_token,
          user: userWithId as User & { _id: string },
        });

        console.log('Token exchange successful, redirecting...');
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to exchange public token:', error);
        setError('Failed to connect bank account');
      }
    },
    [user, router]
  );

  const config: PlaidLinkOptions = useMemo(
    () => ({
      token: linkToken || '',
      onSuccess,
      onExit: err => {
        if (err) {
          console.error('Plaid Link exit error:', err);
          setError(err.display_message || 'Connection cancelled');
        }
      },
      onEvent: (eventName, metadata) => {
        console.log('Plaid Link event:', eventName, metadata);
      },
    }),
    [linkToken, onSuccess]
  );

  const { open, ready } = usePlaidLink(config);

  // Show loading state
  if (loading) {
    return (
      <Button disabled className="plaidlink-primary">
        Loading...
      </Button>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-2">
        <Button
          disabled
          className="plaidlink-primary bg-red-500 hover:bg-red-600"
        >
          Connection Error
        </Button>
        <p className="text-sm text-red-500">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="sm"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Show connect button
  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready || !linkToken}
          className="plaidlink-primary"
        >
          {ready ? 'Connect Bank' : 'Preparing...'}
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="plaidlink-ghost"
          disabled={!ready || !linkToken}
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2 max-xl:hidden">
            Connect bank
          </p>
        </Button>
      ) : variant === 'add' ? (
        <div className="flex w-full justify-between items-center">
          <h2 className="header-2">My Banks</h2>
          <Button
            onClick={() => open()}
            variant="ghost"
            className="plaidlink-ghost flex items-center gap-2"
            disabled={!ready || !linkToken}
          >
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => open()}
          className="plaidlink-default"
          disabled={!ready || !linkToken}
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2">Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
