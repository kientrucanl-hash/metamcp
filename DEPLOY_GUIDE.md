# HƯỚNG DẪN HOÀN THIỆN & DEPLOY TRANG CHÍNH SÁCH BẢO MẬT (PRIVACY POLICY)

Tài liệu này hướng dẫn bạn cách nhanh nhất để đưa trang Chính sách Bảo mật đã được điền thông tin hoàn chỉnh lên trực tuyến (online) và lấy liên kết (`URL`) điền vào Meta App Developer Dashboard.

---

## BƯỚC 1: Trạng Thái Hiện Tại (Đã Được Thiết Lập Sẵn)
Tôi đã thực hiện các bước chuẩn bị kỹ thuật sau cho bạn:
1. **Cập nhật thông tin**: Đã thay thế toàn bộ thông tin về **CÔNG TY TNHH KIẾN TRÚC ANL VÀ CỘNG SỰ** và ứng dụng **ANLAA_APP_V1** vào mã nguồn.
2. **Đổi tên file tối ưu**: Đã đổi tên file từ `privacy-policy.html` thành `index.html` để làm trang chủ mặc định cho website của bạn.
3. **Khởi tạo Git**: Đã tạo file `.gitignore` (chặn `.env` để bảo mật) và tạo commit đầu tiên trên nhánh `main`.

*Bạn có thể xem lại file HTML tĩnh tại đây: [index.html](file:///g:/.AIWork/.9-meta/index.html) hoặc file text thô tại đây: [privacy-policy-text.md](file:///g:/.AIWork/.9-meta/privacy-policy-text.md).*

---

## BƯỚC 2: Hướng Dẫn Deploy Lên GitHub Pages (Phương Án 1)

Vì Git đã được khởi tạo và commit cục bộ sẵn sàng, bạn chỉ cần thực hiện các thao tác đơn giản sau trên máy tính của mình:

1. Đăng nhập vào [GitHub](https://github.com/) của bạn.
2. Tạo một kho lưu trữ mới (New Repository):
   - Đặt tên kho lưu trữ (ví dụ: `anlaa-meta-privacy`).
   - Chọn chế độ **Public** (Công khai - Bắt buộc để dùng được GitHub Pages miễn phí).
   - **Không** chọn khởi tạo file README, .gitignore hoặc License (vì dự án của bạn đã có sẵn).
   - Nhấn **Create repository**.
3. Sau khi tạo xong, GitHub sẽ hiển thị các dòng lệnh hướng dẫn. Bạn hãy mở Terminal tại thư mục dự án của mình và chạy 2 lệnh sau (hãy thay thế đường dẫn repo GitHub của bạn):
   ```bash
   git remote add origin https://github.com/[username-github]/[ten-repo-cua-ban].git
   git push -u origin main
   ```
4. Khi quá trình tải lên hoàn tất:
   - Truy cập vào Repository đó trên trình duyệt GitHub của bạn.
   - Nhấp chọn tab **Settings** (Cài đặt) ở góc trên bên phải.
   - Ở menu bên trái, nhấp chọn **Pages**.
   - Trong mục **Build and deployment** -> **Branch**, chọn nhánh **main** và thư mục **/ (root)**.
   - Nhấn **Save** (Lưu).
5. Đợi khoảng 1 phút và tải lại trang, GitHub sẽ cung cấp một đường link trực tuyến dạng:
   `https://[username-github].github.io/[ten-repo-cua-ban]/`
6. Copy link này và dán vào Meta App Dashboard.

---

## BƯỚC 3: Điền vào Meta App Dashboard

1. Truy cập vào trang quản lý ứng dụng của bạn: [Meta Developers](https://developers.facebook.com/).
2. Chọn ứng dụng của bạn (**ANLAA_APP_V1**).
3. Ở menu bên trái, truy cập vào **App Settings** (Cài đặt ứng dụng) -> **Basic** (Thông thường).
4. Tìm ô **Privacy Policy URL** (URL Chính sách quyền riêng tư).
5. Dán đường link GitHub Pages bạn vừa tạo ở Bước 2 vào đó.
6. Nhấp vào **Save changes** (Lưu thay đổi) ở dưới cùng.

---

> [!IMPORTANT]
> *Hãy đảm bảo link chính sách bảo mật có thể truy cập công khai từ bên ngoài mà không cần mật khẩu đăng nhập, nếu không Meta sẽ từ chối ứng dụng của bạn trong quá trình kiểm duyệt.*
