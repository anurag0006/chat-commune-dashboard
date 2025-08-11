import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, Shield, MessageSquare, User, Smartphone } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your WhatsApp Business account and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Profile</h3>
              <p className="text-sm text-muted-foreground">
                Manage your business profile information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="Acme Corporation" />
              </div>
              <div>
                <Label htmlFor="business-phone">Business Phone</Label>
                <Input id="business-phone" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
            <div>
              <Label htmlFor="business-description">Business Description</Label>
              <Input
                id="business-description"
                placeholder="Tell customers about your business..."
                defaultValue="We provide excellent customer service and quality products."
              />
            </div>
          </div>
        </Card>

        {/* Messaging Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">Messaging</h3>
              <p className="text-sm text-muted-foreground">
                Configure your messaging preferences
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-reply</p>
                <p className="text-sm text-muted-foreground">
                  Send automatic replies when you're away
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Read receipts</p>
                <p className="text-sm text-muted-foreground">
                  Show when you've read messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Typing indicators</p>
                <p className="text-sm text-muted-foreground">
                  Show when you're typing a message
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Label htmlFor="away-message">Away Message</Label>
              <Input
                id="away-message"
                placeholder="Thanks for your message. We'll get back to you soon!"
                defaultValue="Thanks for contacting us! We're currently away but will respond within 24 hours."
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Choose what notifications you want to receive
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Desktop notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified on your desktop for new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sound notifications</p>
                <p className="text-sm text-muted-foreground">
                  Play sound when you receive new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get email notifications for important updates
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                Manage your privacy and security settings
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">End-to-end encryption</p>
                <p className="text-sm text-muted-foreground">
                  All your messages are automatically encrypted
                </p>
              </div>
              <span className="text-sm text-green-600 font-medium">Enabled</span>
            </div>

            <Separator />

            <Button variant="destructive" size="sm">
              Export Chat History
            </Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold">Appearance</h3>
              <p className="text-sm text-muted-foreground">
                Customize how the app looks and feels
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Choose between light, dark, or system theme
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}