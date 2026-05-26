# HƯỚNG DẪN HOÀN THIỆN & DEPLOY TRANG CHÍNH SÁCH BẢO MẬT (PRIVACY POLICY)

Tài liệu này hướng dẫn bạn cách nhanh nhất để đưa trang Chính sách Bảo mật đã được điền thông tin hoàn chỉnh lên trực tuyến (online) và lấy liên kết (`URL`) điền vào Meta App Developer Dashboard.

---

## BƯỚC 1: Kiểm Tra Thông Tin (Đã Được Cập Nhật Tự Động)
Tôi đã thay thế toàn bộ thông tin doanh nghiệp chính xác của bạn vào các file mã nguồn:
* **Đơn vị chủ quản**: CÔNG TY TNHH KIẾN TRÚC ANL VÀ CỘNG SỰ
* **Tên ứng dụng**: ANLAA_APP_V1
* **Email hỗ trợ**: kientruc.anl@gmail.com
* **Địa chỉ**: Tầng 9, Khối C Toà nhà HỒ GƯƠM PLAZA, 102 Trần Phú, Phường Hà Đông, Thành Phố Hà Nội, Việt Nam
* **Số điện thoại**: +84356238989

*Bạn có thể xem lại file HTML tĩnh tại đây: [privacy-policy.html](file:///g:/.AIWork/.9-meta/privacy-policy.html) hoặc file text thô tại đây: [privacy-policy-text.md](file:///g:/.AIWork/.9-meta/privacy-policy-text.md).*

---

## BƯỚC 2: Chọn Cách Deploy Để Lấy Link Online

Dưới đây là 3 phương pháp phổ biến, hoàn toàn miễn phí và cực kỳ nhanh chóng:

### CÁCH 1: Sử dụng GitHub Pages (Khuyên Dùng)
Nếu dự án của bạn đã có kho lưu trữ (Repository) trên GitHub, đây là cách tối ưu nhất:

1. Đổi tên file `privacy-policy.html` thành `index.html` (hoặc giữ nguyên nếu bạn muốn link dẫn trực tiếp dạng `.../privacy-policy.html`).
2. Push file này lên GitHub Repository của bạn.
3. Truy cập vào kho lưu trữ đó trên trình duyệt, chọn tab **Settings** (Cài đặt).
4. Ở menu bên trái, chọn **Pages**.
5. Trong mục **Build and deployment** -> **Source**, chọn **Deploy from a branch**.
6. Chọn nhánh chính (ví dụ `main` hoặc `master`) và thư mục `/ (root)`, sau đó nhấn **Save**.
7. Đợi khoảng 1-2 phút, GitHub sẽ cấp cho bạn một đường link dạng:
   `https://[username].github.io/[repository-name]/privacy-policy.html`
8. Copy link này và dán vào Meta App Dashboard.

---

### CÁCH 2: Sử dụng Vercel (Nhanh chóng & Giao diện Đẹp)
Vercel cho phép deploy trực tiếp bằng cách kéo thả file cực kỳ tiện lợi:

1. Truy cập vào [Vercel](https://vercel.com/) và đăng nhập bằng tài khoản GitHub/Google của bạn.
2. Tại màn hình Dashboard, nhấp vào **Add New...** -> **Project**.
3. Nếu chưa liên kết Git, bạn có thể sử dụng công cụ **Vercel CLI** hoặc sử dụng tính năng kéo thả folder bằng cách nén folder chứa file `privacy-policy.html` lại và upload lên (hoặc kết nối với GitHub Repo vừa tạo ở cách 1).
4. Vercel sẽ tự động tạo một sub-domain miễn phí có HTTPS (ví dụ: `https://ten-du-an.vercel.app/privacy-policy.html`).
5. Copy link này và dán vào Meta App Dashboard.

---

### CÁCH 3: Sử dụng Google Docs / Notion (Dành cho người dùng không muốn dùng Hosting)
Nếu bạn không muốn liên quan đến code hay hosting:

1. Mở file [privacy-policy-text.md](file:///g:/.AIWork/.9-meta/privacy-policy-text.md) và sao chép (Copy) toàn bộ nội dung văn bản.
2. Truy cập [Google Docs](https://docs.google.com/) và tạo một tài liệu mới.
3. Dán (Paste) nội dung vừa copy vào.
4. Nhấp vào nút **Chia sẻ** (Share) ở góc trên bên phải.
5. Trong phần **Quyền truy cập chung**, chuyển từ *Hạn chế* sang **Bất kỳ ai có đường liên kết đều có thể xem**.
6. Sao chép đường liên kết (Copy Link) này và dán vào Meta App Dashboard.

---

## BƯỚC 3: Điền vào Meta App Dashboard

1. Truy cập vào trang quản lý ứng dụng của bạn: [Meta Developers](https://developers.facebook.com/).
2. Chọn ứng dụng của bạn.
3. Ở menu bên trái, truy cập vào **App Settings** (Cài đặt ứng dụng) -> **Basic** (Thông thường).
4. Tìm ô **Privacy Policy URL** (URL Chính sách quyền riêng tư).
5. Dán đường link bạn vừa tạo ở Bước 2 vào đó.
6. Nhấp vào **Save changes** (Lưu thay đổi) ở dưới cùng.

---

> [!IMPORTANT]
> *Hãy đảm bảo link chính sách bảo mật có thể truy cập công khai từ bên ngoài mà không cần mật khẩu đăng nhập, nếu không Meta sẽ từ chối ứng dụng của bạn trong quá trình kiểm duyệt.*
