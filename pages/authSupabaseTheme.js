import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "../styles/Auth.module.css";

const AuthSupabaseTheme = () => {
  const supabase = useSupabaseClient();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Blueledger Vendor Portal</div>
      <div className={styles.subTitle}>Empowering Small Businesses and Streamlining Procurement</div>
      <div className={styles.formContainer}>
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#2196F3",
                  brandAccent: "#2162f3 ",
                },
              },
            },
          }}
          supabaseClient={supabase}
          providers={["google", "facebook"]}
          socialLayout="vertical"
          //theme="dark"
        />
      </div>
    </div>
  );
};

export default AuthSupabaseTheme;
