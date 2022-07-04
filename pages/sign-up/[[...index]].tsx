import { SignUp } from "@clerk/nextjs";
import { Layout } from "../../components/Layout";

const SignUpPage = () => {
  return (
    <Layout>
      <div className="container h-full mx-auto py-5 px-2">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </Layout>
  );
};

export default SignUpPage;
