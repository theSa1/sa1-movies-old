import { SignIn } from "@clerk/nextjs";
import { Layout } from "../../components/Layout";

const SignInPage = () => {
  return (
    <Layout>
      <div className="container h-full mx-auto py-5 px-2">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </Layout>
  );
};

export default SignInPage;
