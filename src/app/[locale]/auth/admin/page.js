import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import LogOutButton from "@/components/auth/LogOutButton";
import ChangePasswordForm from "@/components/auth/Admin/ChangePasswordForm";
import CreateAdminForm from "@/components/auth/CreateAdminForm";
import DeleteAdmin from "@/components/auth/Admin/DeleteAdmin";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Console",
  description:
    "Take actions as admins and dynamically display permisiones based on admin level. Website created by Chris Thornburg, github:CJThornburg "
};





async function AdminConsole() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }
  const isOverlord = session.user.isOverLord;

  return (
    <>
      <h1 className="sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl text-center font-header mt-8">
        Admin Console
      </h1>

     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
  <ChangePasswordForm />
  {isOverlord && <CreateAdminForm />}
  {isOverlord && <DeleteAdmin />}
</div>
    </>
  );
}

export default AdminConsole;
