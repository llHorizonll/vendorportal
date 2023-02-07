import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import styles from "../styles/Auth.module.css";
import SignIn from "../components/Auth/signIn";
import CreateBu from "../components/Auth/createBu";
import ForgotPassword from "../components/Auth/forgotPassword";
import EmailActivate from "../components/Auth/emailActivate";
import CreateUser from "../components/Auth/createUser";

const AuthSupabaseTheme = ({ inviteCode, view = "sign_in" }) => {
  const supabase = useSupabaseClient();

  const [authView, setAuthView] = useState(view);
  const [invitationData, setInvitationData] = useState();
  const [companyFormData, setCompanyFormData] = useState();

  useEffect(() => {
    if (inviteCode) {
      getDataFromInvitationById(inviteCode);
    }
  }, [inviteCode]);

  async function getDataFromInvitationById(code) {
    // let mockupData = {
    //   company: {
    //     email: "show@email.com",
    //     county: "Yannawa",
    //     tax_id: "1234567890123",
    //     address: "test1",
    //     district: "Bangpongpang",
    //     province: "Krung Thep",
    //     branch_id: "0001",
    //     telephone: "0800000000",
    //     company_name: "CARMEN",
    //   },
    //   endpoint: "https://app.carmenteam.com",
    //   contact_info: {
    //     county: "Yannawa",
    //     tax_id: "TAXID",
    //     address: "test1",
    //     district: "Bangpongpang",
    //     province: "Krung Thep",
    //     branch_id: "BranchID",
    //     telephone: "0800000000",
    //     show_email: "show@email.com",
    //     company_name: "CARMEN",
    //     contact_email: "contact@email.com",
    //   },
    // };
    // setInvitationData(mockupData);
    try {
      let { data, error, status } = await supabase.from("invitation").select(`*`).eq("id", code).single();
      if (!data) {
        alert("not found code");
        return;
      }
      setInvitationData(data);
      if (error && status !== 406) {
        throw error;
      }
      if (!data.business_unit_id && new Date(data.valid_till) > new Date()) {
        setAuthView("create_bu");
      } else {
        setAuthView("sign_in");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      console.group("%c #1", "color: white; background-color: red");
      console.log("get invitationById in invitation_table");
      console.log("check have buId and valid_till > now()");
      console.groupEnd();
      console.group("%c #2", "color: white; background-color: red");
      console.log("IF PASS go to create new company and user");
      console.log("ELSE stay in login page");
      console.groupEnd();
    }
  }

  const Container = ({ children }) => (
    <div className={styles.container}>
      <div className={styles.title}>Blueledger Vendor Portal</div>
      <div className={styles.subTitle}>Empowering Small Businesses and Streamlining Procurement</div>
      <div className={styles.formContainer}>{children}</div>
    </div>
  );

  switch (authView) {
    case "sign_in":
      return (
        <Container>
          <SignIn authView={"sign_in"} setAuthView={setAuthView} />
        </Container>
      );
    case "create_bu":
      return (
        <Container>
          <CreateBu
            authView={"create_bu"}
            setAuthView={setAuthView}
            invitationData={invitationData}
            setCompanyFormData={setCompanyFormData}
          />
        </Container>
      );
    case "create_user":
      return (
        <Container>
          <CreateUser authView={"create_user"} setAuthView={setAuthView} companyFormData={companyFormData} />
        </Container>
      );
    case "email_activate":
      return (
        <Container>
          <EmailActivate authView={"email_activate"} setAuthView={setAuthView} />
        </Container>
      );
    case "forgot_password":
      return (
        <Container>
          <ForgotPassword authView={"forgot_password"} setAuthView={setAuthView} />
        </Container>
      );
    default:
      return null;
  }

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.title}>Blueledger Vendor Portal</div>
  //     <div className={styles.subTitle}>Empowering Small Businesses and Streamlining Procurement</div>
  //     <div className={styles.formContainer}>
  //        <Auth
  //         redirectTo="http://localhost:3000/"
  //         appearance={{
  //           theme: ThemeSupa,
  //           variables: {
  //             default: {
  //               colors: {
  //                 brand: "#2196F3",
  //                 brandAccent: "#2162f3 ",
  //               },
  //             },
  //           },
  //         }}
  //         supabaseClient={supabase}
  //         providers={["google", "facebook"]}
  //         socialLayout="vertical"
  //         //theme="dark"
  //       />
  //     </div>
  //   </div>
  // );
};

export default AuthSupabaseTheme;
