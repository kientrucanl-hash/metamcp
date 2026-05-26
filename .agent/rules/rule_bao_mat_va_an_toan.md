# Rule: Bảo Mật và An Toàn Hệ Thống — Meta MCP Server Integration

Tài liệu này là quy tắc hoạt động **bắt buộc** áp dụng cho mọi AI trợ lý khi làm việc trên dự án **Meta MCP Server** (`meta-mcp-server`), nhằm đảm bảo an toàn tuyệt đối cho tài chính, dữ liệu cá nhân của khách hàng và an ninh hệ thống của **CÔNG TY TNHH KIẾN TRÚC ANL VÀ CỘNG SỰ**.

---

## 1. Nguyên tắc Xưng hô & Giao tiếp

*   Khi giao tiếp với người dùng: Xưng **tôi**, gọi người dùng là **bạn**.
*   Ngôn ngữ mặc định giao tiếp và giải thích logic: **Tiếng Việt**.
*   Ngôn ngữ viết code, biến, comment, commit message: **Tiếng Anh**.

---

## 2. Rủi ro Tài chính & Quy tắc An toàn Quảng cáo (Meta Ads Safety)

Các tác vụ quản lý ngân sách quảng cáo ảnh hưởng trực tiếp đến ngân sách tài chính của doanh nghiệp:

*   **BẮT BUỘC hỏi xác nhận**: Khi thực hiện cập nhật ngân sách qua công cụ `meta_ads_update_campaign_budget` hoặc bất kỳ hành động thay đổi trạng thái chiến dịch quảng cáo nào.
*   **Công thức & Chữ số**: Trước khi thực hiện thay đổi ngân sách:
    - Phải hiển thị rõ công thức tính toán ngân sách trước, kết quả sau.
    - Làm tròn tối đa 2 chữ số thập phân.
    - Số tiền phải hiển thị rõ định dạng VNĐ (dấu `.` phân nghìn, hậu tố `VNĐ`, ví dụ: `1.500.000 VNĐ`) kèm theo **phần viết bằng chữ tiếng Việt đầy đủ**.
*   **Mẫu xác nhận bắt buộc**:
    > "Tôi cần cập nhật ngân sách chiến dịch [Tên Chiến dịch] từ **[Ngân sách Cũ]** thành **[Ngân sách Mới]** (Bằng chữ: [Ngân sách Mới bằng chữ]). Bạn có xác nhận thay đổi này để tôi thực hiện không?"

---

## 3. Bảo vệ Dữ liệu Cá nhân của Khách hàng (PII Protection)

Dự án này tích hợp Messenger và WhatsApp API, trực tiếp tiếp xúc với thông tin khách hàng:

*   **TUYỆT ĐỐI KHÔNG** lưu trữ lịch sử tin nhắn, số điện thoại, tên khách hàng (PII) từ các tool `meta_messenger_get_conversations` hoặc WhatsApp API vào các file tĩnh, file cấu hình hoặc ghi ra log hệ thống bên ngoài workspace.
*   **TUYỆT ĐỐI KHÔNG** in ra thông tin PII của khách hàng trên kênh chat công khai nếu không có yêu cầu cụ thể.
*   Khi viết test hoặc code mẫu: **Bắt buộc dùng dữ liệu giả (mock data)**, không lấy thông tin thật từ các cuộc hội thoại của khách hàng để làm ví dụ.

---

## 4. Bảo mật Khóa truy cập (Secrets & Access Tokens)

*   **Tuyệt đối bảo mật**: Không bao giờ hiển thị, log ra hoặc ghi lại mã `META_ACCESS_TOKEN` ở bất kỳ định dạng plain text nào.
*   **Không hardcode credentials**: Mọi cấu hình token, Ad Account ID, Page ID bắt buộc phải dùng biến môi trường từ file `.env`.
*   **Chặn đẩy lên Git**: File `.env` và thư mục log `02_Process/audit_log/` đã được cấu hình trong `.gitignore` để chặn đẩy lên repository GitHub công khai. Tuyệt đối không sửa `.gitignore` để đẩy các file này lên.

---

## 5. Danh sách Hành động Cấm & Phải Hỏi trước

### 5.1 Tuyệt đối CẤM tự ý thực hiện (Chưa có lệnh rõ ràng):
*   Xóa file hoặc thư mục bất kỳ trong dự án.
*   Ghi đè hoặc sửa đổi các file mẫu/file code lõi khi chưa thống nhất giải pháp.
*   Dừng hoặc kết thúc các process đang chạy của server.

### 5.2 BẮT BUỘC phải hỏi ý kiến xác nhận của bạn trước khi:
*   Chạy lệnh commit hoặc push code lên repository GitHub `https://github.com/kientrucanl-hash/metamcp.git`.
*   Ghi đè hoặc thay đổi các cấu hình trong file `.env` hoặc `.gitignore`.
*   Cài đặt thêm các thư viện NPM mới vào `package.json`.

---

## 6. Tóm tắt nhanh — Bảng quyết định hành động

```
Thao tác của tôi liên quan đến...
├── Thay đổi ngân sách Quảng cáo?     → BẮT BUỘC Hiển thị số tiền VNĐ bằng chữ + HỎI XÁC NHẬN
├── Thông tin cá nhân khách hàng?   → TUYỆT ĐỐI KHÔNG lưu log/file, dùng dữ liệu Mock để test
├── Thay đổi file cấu hình (.env)?  → HỎI trước khi ghi đè
├── Push code lên GitHub?           → HỎI trước khi thực hiện
└── Không chắc chắn?                → Mặc định là DỪNG LẠI VÀ HỎI
```

---

*Cần con người rà soát trước khi sử dụng chính thức.*
*Tài liệu áp dụng từ ngày 26 tháng 05 năm 2026 cho dự án Meta MCP.*
