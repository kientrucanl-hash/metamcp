# HƯỚNG DẪN HOÀN THIỆN & DEPLOY TRANG CHÍNH SÁCH BẢO MẬT (PRIVACY POLICY)

Tài liệu này hướng dẫn bạn cách nhanh nhất để đưa trang Chính sách Bảo mật đã được điền thông tin hoàn chỉnh lên trực tuyến (online) và lấy liên kết (`URL`) điền vào Meta App Developer Dashboard.

---

## BƯỚC 1: Trạng Thái Hiện Tại (Đã Được Thiết Lập Sẵn)
Tôi đã thực hiện toàn bộ các bước chuẩn bị kỹ thuật và tải lên (push) code thành công:
1. **Cập nhật thông tin**: Đã thay thế toàn bộ thông tin về **CÔNG TY TNHH KIẾN TRÚC ANL VÀ CỘNG SỰ** và ứng dụng **ANLAA_APP_V1** vào mã nguồn.
2. **Đổi tên file tối ưu**: Đã đổi tên file từ `privacy-policy.html` thành `index.html` để làm trang chủ mặc định cho website của bạn.
3. **Đẩy code lên GitHub**: Đã liên kết và đẩy thành công toàn bộ mã nguồn lên repository GitHub của bạn tại: [https://github.com/kientrucanl-hash/metamcp.git](https://github.com/kientrucanl-hash/metamcp.git).

---

## BƯỚC 2: Kích Hoạt GitHub Pages Để Lấy Link Online

Vì toàn bộ code đã được đưa lên repo GitHub của bạn, bạn chỉ cần thực hiện 1 thao tác nhỏ duy nhất trên trình duyệt để kích hoạt trang web:

1. Truy cập vào Repository của bạn trên trình duyệt: [https://github.com/kientrucanl-hash/metamcp](https://github.com/kientrucanl-hash/metamcp)
2. Nhấp chọn tab **Settings** (Cài đặt) ở góc trên bên phải của repo.
3. Ở menu bên trái, nhấp chọn mục **Pages**.
4. Trong phần **Build and deployment** -> **Branch**:
   - Chọn nhánh **main** thay cho *None*.
   - Chọn thư mục **/ (root)**.
   - Nhấn **Save** (Lưu).
5. Đợi khoảng 30 giây đến 1 phút và tải lại (F5) trang Pages đó. GitHub sẽ cấp cho bạn một đường link trực tuyến chính thức có sẵn HTTPS:
   
   👉 **URL Trang web của bạn**: `https://kientrucanl-hash.github.io/metamcp/`
   
6. Hãy sao chép liên kết trên để sử dụng.

---

## BƯỚC 3: Điền vào Meta App Dashboard

1. Truy cập vào trang quản lý ứng dụng của bạn: [Meta Developers](https://developers.facebook.com/).
2. Chọn ứng dụng của bạn (**ANLAA_APP_V1**).
3. Ở menu bên trái, truy cập vào **App Settings** (Cài đặt ứng dụng) -> **Basic** (Thông thường).
4. Tìm ô **Privacy Policy URL** (URL Chính sách quyền riêng tư).
5. Dán đường link GitHub Pages chính thức của bạn vào đó:
   `https://kientrucanl-hash.github.io/metamcp/`
6. Nhấp vào **Save changes** (Lưu thay đổi) ở dưới cùng để hoàn tất.

---

> [!IMPORTANT]
> *Hãy đảm bảo link chính sách bảo mật có thể truy cập công khai từ bên ngoài mà không cần mật khẩu đăng nhập, nếu không Meta sẽ từ chối ứng dụng của bạn trong quá trình kiểm duyệt.*
