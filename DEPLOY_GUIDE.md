# HƯỚNG DẪN HOÀN THIỆN & DEPLOY TRANG CHÍNH SÁCH BẢO MẬT & XÓA DỮ LIỆU

Tài liệu này hướng dẫn bạn cách nhanh nhất để đưa trang Chính sách Bảo mật và trang Hướng dẫn xóa dữ liệu lên trực tuyến (online) và điền liên kết (`URL`) vào Meta App Developer Dashboard.

---

## BƯỚC 1: Trạng Thái Hiện Tại (Đã Được Thiết Lập Sẵn)
Tôi đã thực hiện toàn bộ các bước chuẩn bị kỹ thuật và tải lên (push) code thành công:
1. **Cập nhật thông tin**: Đã thay thế toàn bộ thông tin về **CÔNG TY TNHH KIẾN TRÚC ANL VÀ CỘNG SỰ** và ứng dụng **ANLAA_APP_V1** vào mã nguồn.
2. **Các trang đã được tạo**:
   - Trang Chính sách Bảo mật chủ đạo: [index.html](file:///g:/.AIWork/.9-meta/index.html)
   - Trang Hướng dẫn Xóa dữ liệu người dùng: [data-deletion.html](file:///g:/.AIWork/.9-meta/data-deletion.html)
3. **Đẩy code lên GitHub**: Đã liên kết và đẩy thành công toàn bộ mã nguồn lên repository GitHub của bạn tại: [https://github.com/kientrucanl-hash/metamcp.git](https://github.com/kientrucanl-hash/metamcp.git).

---

## BƯỚC 2: Kích Hoạt GitHub Pages Để Lấy Link Online

Vì toàn bộ code đã được đưa lên repo GitHub của bạn, bạn chỉ cần thực hiện 1 thao tác nhỏ duy nhất trên trình duyệt để kích hoạt trang web:

1. Truy cập vào phần cài đặt Pages của Repository: [https://github.com/kientrucanl-hash/metamcp/settings/pages](https://github.com/kientrucanl-hash/metamcp/settings/pages)
2. Trong phần **Build and deployment** -> **Branch**:
   - Chọn nhánh **main** thay cho *None*.
   - Chọn thư mục **/ (root)**.
   - Nhấn **Save** (Lưu).
3. Đợi khoảng 30 giây đến 1 phút và tải lại (F5) trang Pages đó. GitHub sẽ kích hoạt trang web của bạn với 2 đường link trực tuyến:
   
   👉 **URL Trang Chính sách Bảo mật**: `https://kientrucanl-hash.github.io/metamcp/`
   
   👉 **URL Trang Hướng dẫn Xóa dữ liệu**: `https://kientrucanl-hash.github.io/metamcp/data-deletion.html`

---

## BƯỚC 3: Điền vào Meta App Dashboard

1. Truy cập vào trang quản lý ứng dụng của bạn: [Meta Developers](https://developers.facebook.com/).
2. Chọn ứng dụng của bạn (**ANLAA_APP_V1**).
3. Ở menu bên trái, truy cập vào **App Settings** (Cài đặt ứng dụng) -> **Basic** (Thông thường).
4. **Điền URL Chính sách Bảo mật**:
   - Tìm ô **Privacy Policy URL** (URL Chính sách quyền riêng tư).
   - Dán đường link sau vào:
     `https://kientrucanl-hash.github.io/metamcp/`
5. **Điền URL Hướng dẫn Xóa dữ liệu**:
   - Tìm mục **User Data Deletion** (Xóa dữ liệu người dùng).
   - Chọn loại **Data deletion instructions URL** (Đường link hướng dẫn xóa dữ liệu).
   - Dán đường link sau vào:
     `https://kientrucanl-hash.github.io/metamcp/data-deletion.html`
6. Nhấp vào **Save changes** (Lưu thay đổi) ở dưới cùng để hoàn tất.

---

> [!IMPORTANT]
> *Hãy đảm bảo cả hai đường link trên đều có thể truy cập công khai từ bên ngoài mà không cần mật khẩu đăng nhập, nếu không Meta sẽ từ chối ứng dụng của bạn trong quá trình kiểm duyệt.*
