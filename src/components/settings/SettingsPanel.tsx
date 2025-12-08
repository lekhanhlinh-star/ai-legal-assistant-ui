import { Bell, Globe, Moon, Shield, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SettingsPanel = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-foreground">Tuỳ chỉnh</h2>
        <p className="text-sm text-muted-foreground">
          Quản lý cài đặt tài khoản và ứng dụng
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-2xl space-y-8">
          {/* Profile Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Thông tin cá nhân</h3>
            </div>
            <div className="space-y-4 p-4 bg-card rounded-xl border border-border/50">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <Input
                    id="fullname"
                    defaultValue="Nguyễn Văn A"
                    className="bg-secondary/50 border-border/50 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="admin@example.com"
                    className="bg-secondary/50 border-border/50 rounded-xl"
                  />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                Cập nhật thông tin
              </Button>
            </div>
          </section>

          {/* Notifications Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Thông báo</h3>
            </div>
            <div className="space-y-4 p-4 bg-card rounded-xl border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Thông báo email</Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo qua email khi có cập nhật
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Thông báo đẩy</Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo trực tiếp trên trình duyệt
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </section>

          {/* Language Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Ngôn ngữ</h3>
            </div>
            <div className="space-y-4 p-4 bg-card rounded-xl border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Ngôn ngữ hiển thị</Label>
                  <p className="text-sm text-muted-foreground">
                    Tiếng Việt (Việt Nam)
                  </p>
                </div>
                <Button variant="outline" className="rounded-xl">
                  Thay đổi
                </Button>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Bảo mật</h3>
            </div>
            <div className="space-y-4 p-4 bg-card rounded-xl border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Xác thực hai yếu tố</Label>
                  <p className="text-sm text-muted-foreground">
                    Bảo vệ tài khoản với xác thực bổ sung
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Đổi mật khẩu</Label>
                  <p className="text-sm text-muted-foreground">
                    Cập nhật mật khẩu định kỳ để bảo mật
                  </p>
                </div>
                <Button variant="outline" className="rounded-xl">
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
