# Firebase Parent Project Deployment

Các script deploy Firebase Parent Project với Node.js - hoạt động trên **Windows, macOS, Linux**.

## 📋 Yêu cầu

- **Node.js 22+** (hoặc fnm/nvm để quản lý version)
- **Firebase CLI 15+**
- **Service Account JSON** (`firebase-parent-service-account.json`)
- **public/data.js** file

## 🚀 Cách sử dụng

### Windows (Cmd / PowerShell)

```bash
# Cách 1: Dùng Batch file (đơn giản nhất)
.\deploy-parent.bat Amenosa

# Cách 2: Dùng PowerShell
.\deploy-parent.ps1 Amenosa

# Cách 3: Dùng Node.js trực tiếp
fnm use 22
node deploy-parent.js Amenosa
```

### macOS / Linux

```bash
# Cách 1: Dùng Shell script
chmod +x ./deploy-parent.sh
./deploy-parent.sh Amenosa

# Cách 2: Dùng Node.js trực tiếp
fnm use 22
node deploy-parent.js Amenosa

# hoặc nếu dùng nvm
nvm use 22
node deploy-parent.js Amenosa
```

## 📁 Script Files

| File | Platform | Mục đích |
|------|----------|---------|
| `deploy-parent.js` | Tất cả | Node.js script chính - logic deploy |
| `deploy-parent.bat` | Windows | Batch wrapper - gọi Node.js |
| `deploy-parent.ps1` | Windows | PowerShell wrapper - gọi Node.js |
| `deploy-parent.sh` | macOS/Linux | Shell wrapper - gọi Node.js |

## ✨ Features

- ✅ Xác thực dùng Service Account JSON (không dùng Gmail login)
- ✅ Tự động update `data.js` với project mới
- ✅ Deploy Firebase Hosting
- ✅ Output rõ ràng, dễ debug
- ✅ Hoạt động trên Windows, macOS, Linux

## 🔐 Authentication

Script sử dụng **Service Account** thay vì user account:

```javascript
process.env.GOOGLE_APPLICATION_CREDENTIALS = SERVICE_ACCOUNT;
firebase deploy --project=mangacuadango --non-interactive
```

**Service Account file**: `firebase-parent-service-account.json`
- Email: `firebase-adminsdk-fbsvc@mangacuadango.iam.gserviceaccount.com`
- Required roles: Firebase Hosting Admin, Service Usage Consumer

## 🐛 Troubleshooting

### "fnm not found"
```bash
# Cài đặt fnm (macOS)
brew install fnm

# hoặc dùng nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### "Firebase CLI not found"
```bash
npm install -g firebase-tools@15
```

### "Service account not found"
- Kiểm tra file `firebase-parent-service-account.json` tồn tại
- Đặt file cùng thư mục với deploy script

### "Caller does not have required permission" (403 Error)
- Kiểm tra Service Account có quyền IAM đúng
- Truy cập: https://console.cloud.google.com/iam-admin/iam?project=mangacuadango
- Cấp quyền "Firebase Hosting Admin" cho service account

## 📝 Output Example

```
============================================================
Firebase Parent Project Deployment (Node.js)
============================================================
Project      : Amenosa
data.js      : /path/to/public/data.js
Service acct : /path/to/firebase-parent-service-account.json
============================================================

[1/6] Checking Firebase Service Account...
✓ Service account found

[2/6] Checking data.js...
✓ data.js found

[3/6] Verifying Node.js version...
Node version: v22.22.1

[4/6] Checking Firebase CLI...
Firebase version: 15.15.0

[5/6] Updating data.js...
✓ Added project: Amenosa

[6/6] Deploying to Firebase...

Authentication: Service Account (via GOOGLE_APPLICATION_CREDENTIALS)
Credentials   : /path/to/firebase-parent-service-account.json

=== Deploying to 'mangacuadango'...

i  deploying hosting
i  hosting[mangacuadango]: beginning deploy...
i  hosting[mangacuadango]: found 2 files in public
i  hosting: upload complete
+  hosting[mangacuadango]: file upload complete
i  hosting[mangacuadango]: finalizing version...
+  hosting[mangacuadango]: version finalized
i  hosting[mangacuadango]: releasing new version...
+  hosting[mangacuadango]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/mangacuadango/overview
Hosting URL: https://mangacuadango.web.app

============================================================
DEPLOY SUCCESS
============================================================
Project deployed: Amenosa
URL: https://proj-amenosa.web.app/
Firebase Console: https://console.firebase.google.com/project/mangacuadango/overview
============================================================
```

## 🔗 Links

- Firebase Console: https://console.firebase.google.com/project/mangacuadango/overview
- Google Cloud IAM: https://console.cloud.google.com/iam-admin/iam?project=mangacuadango
- Firebase CLI Docs: https://firebase.google.com/docs/cli

---

**Note**: Tất cả script dùng chung `deploy-parent.js` - chỉ khác wrapper cho từng platform.
