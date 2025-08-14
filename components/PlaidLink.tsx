import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link';
import useSWR from 'swr';
import { Button } from './ui/button';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  // Use SWR for better data fetching
  const { data: tokenData, error } = useSWR(
    user ? ['linkToken', user._id] : null,
    () => createLinkToken(user as User & { _id: string }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user: user as User & { _id: string; dwollaCustomerId: string },
      });

      router.refresh();
    },
    [user, router]
  );

  const config: PlaidLinkOptions = useMemo(
    () => ({
      token: tokenData?.linkToken || '',
      onSuccess,
    }),
    [tokenData?.linkToken, onSuccess]
  );

  const { open, ready } = usePlaidLink(config);

  if (error) {
    return <div>Error loading Plaid Link</div>;
  }

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready || !tokenData?.linkToken}
          className="plaidlink-primary"
        >
          Connect Bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="plaidlink-ghost"
          disabled={!ready || !tokenData?.linkToken}
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
            disabled={!ready || !tokenData?.linkToken}
          >
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => open()}
          className="plaidlink-default"
          disabled={!ready || !tokenData?.linkToken}
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
