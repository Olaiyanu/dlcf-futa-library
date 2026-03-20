import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="font-display text-2xl font-bold text-foreground">Profile</h1>
      <p className="mt-1 text-muted-foreground">Manage your account details</p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{user?.role} · {user?.membershipId}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email} type="email" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
