import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAutoLogout() {
  const router = useRouter();

  useEffect(() => {
    const tokenExpiration = 30 * 60 * 1000; // 30 minutes
    // const tokenExpiration = 30 * 1000; // 30 secs, test reason
    const timer = setTimeout(() => {
      document.cookie = "jwt-token=; Max-Age=0; path=/";
      document.cookie = "appwrite-session=; Max-Age=0; path=/";
      router.push("/sign-in"); // Redirect login
    }, tokenExpiration);

    return () => clearTimeout(timer); // clear timer
  }, [router]);
}
