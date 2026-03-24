import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";

export function AccountSettings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: "Tech Innovations Inc.",
    email: "admin@techinnovations.com",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const apiKey = "sk_live_1234567890abcdefghijklmnopqrstuvwxyz";

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Password changed");
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API key copied to clipboard!");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card glass>
        <h3 className="text-xl font-semibold mb-6">Company Profile</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Company Name</label>
            <Input
              type="text"
              value={profileData.companyName}
              onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            <p className="text-sm text-muted-foreground mt-2">
              This email is used for account notifications and reports
            </p>
          </div>
          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </form>
      </Card>

      <Card glass>
        <h3 className="text-xl font-semibold mb-6">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Current Password</label>
            <Input
              type="password"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Confirm New Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <Button type="submit" variant="primary">
            Change Password
          </Button>
        </form>
      </Card>

      <Card glass>
        <h3 className="text-xl font-semibold mb-6">API Access</h3>
        <p className="text-muted-foreground mb-6">
          Use this API key to integrate SentimentX into your applications
        </p>
        <div>
          <label className="block mb-2 text-sm">API Key</label>
          <div className="flex gap-3">
            <Input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              readOnly
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button type="button" variant="outline" onClick={copyApiKey}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Keep your API key secure. Do not share it publicly.
          </p>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-muted/30">
          <h4 className="font-semibold mb-2">API Documentation</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Learn how to integrate SentimentX API into your workflow
          </p>
          <Button variant="outline" size="sm">
            View Documentation
          </Button>
        </div>
      </Card>

      <Card glass>
        <h3 className="text-xl font-semibold mb-6">Subscription Plan</h3>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-lg font-semibold mb-1">Professional Plan</p>
            <p className="text-muted-foreground">Unlimited analyses and API access</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">$99</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span className="text-sm">Unlimited product analyses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span className="text-sm">Full API access</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span className="text-sm">Advanced analytics and reports</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span className="text-sm">Priority support</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline" className="text-destructive">Cancel Subscription</Button>
        </div>
      </Card>

      <Card glass className="border-destructive/50">
        <h3 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h3>
        <p className="text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10">
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
