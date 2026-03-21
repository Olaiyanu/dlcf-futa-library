import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Register the user locally
      await register(name, email, password);

      // Log the user out immediately so they don't have access to the dashboard until approved
      if (logout) {
        await logout();
      }

      // 2. Send email notification to Admin using Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1023ade0-e63a-4db0-9dd7-08286ed093eb",
          subject: "New Registration: " + name,
          from_name: "DLCF Library System",
          name: name,
          email: email,
          phone: phone,
          message: "A new member has joined the DLCF FUTA Library.",
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      toast({ title: "Welcome!", description: "Account created successfully." });
      setShowSuccess(true);
    } catch (error) {
      console.error("Email Error:", error);
      toast({ title: "Registration failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className={`container flex min-h-[70vh] items-center justify-center py-12 transition-all duration-300 ${showSuccess ? 'blur-sm pointer-events-none select-none' : ''}`}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <BookOpen className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Join the Fellowship</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create your DLCF account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Grace Adeola" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="08012345678" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
    {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Thank You for Registering!</h2>
          <p className="mt-4 text-muted-foreground">
            The admin will review your details and send your library card to your gmail.
          </p>
          <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
            <p><strong>Note:</strong> Some content on the website is still under progress. More updates are coming soon.</p>
          </div>
          <Button className="mt-8 w-full" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    )}
    </>
  );
};

export default Register;
