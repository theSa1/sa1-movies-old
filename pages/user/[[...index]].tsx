import { UserProfile } from "@clerk/nextjs";
import { Layout } from "../../components/Layout";

const UserProfilePage = () => {
  return (
    <Layout>
      <div className="container h-full mx-auto py-5 px-2">
        <UserProfile path="/user" routing="path" />
      </div>
    </Layout>
  );
};

export default UserProfilePage;
