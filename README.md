# Techmaster_Test

Đây là bài test để ứng tuyển vào vị trí tts Vuejs ở Techmaster

## Câu 1:Trích xuất text thuần từ ssml:

Trong câu này em sử dụng thư viện fs của nodejs và 1 package có tên xml2js.Package xml2js có tác dụng biến đổi nội dung từ file đã đọc thành json. Sau đó em biến đổi json đó thành text và ghi vào file.

## Câu 2:Cải tiến hàm thứ nhất:

Nhận thấy trong Object đã được chuyển đổi có thuộc tính speak.voice.$.name có phân biệt người nói là người Việt Nam hay người nước ngoài, em so sánh thuộc tính đó với giá trị en-US-AndrewMultilingualNeural nếu đúng thì người nói câu đó là A, ngược lại thì là B.

## Câu 3: Trích xuất timestamp:

Sau khi đọc file em biến đổi nó thành 1 Object, Object này có thuộc tính timestamp chứa các giá trị mình cần. Loop qua timestamp và dùng JSON.stringfy() để đưa nó về dạng text và join lại với nhau rồi ghi vào file.

## Câu 4: Xây dựng ứng dụng Vuejs:

### Tổng quan về ứng dụng:

    Ứng dụng được em chia làm ba Components gồm App, AudioPlayer và Highlight, sử dụng Composition API.

### App Component:

    App đảm nhận nhiệm vụ:
    + Lấy dữ liệu text, timestamp từ file.
    + Biến đổi, xử lí logic cho cả 2 dữ liệu :
      -Đối với text, tách người nói A, B ra khỏi câu, sau đó biến câu đó trở thành một mảng các từ (có bao gồm cả dấu câu như .?,!).
      -Thêm index cho mỗi từ.
      -Đối với timestamp, chỉnh lại index cho đồng bộ với index mà từ đang có.
      -Index bắt đầu từ 1 và có tổng cộng có 96 trong đoạn hội thoại.
    + Tạo reactive cho index được highlight và danh sách đoạn hội thoại để truyền xuống Highlight.
    + Nhận thời gian hiện tại do AudioPlayer phát ra và xử lí logic để tìm xem từ nào đang được nhắc đến.
    + Khi biết từ nào đang được nhắc đến (thông qua index) gán biến reactive để re-render lại.

### Highlight Component:

    + Lấy danh sách ( thực tế là mảng ) và chỉ số index của từ đang được highlight thông qua props
    + Render ra đoạn hội thoại
    + Hiển thị từ đang được highlight bằng cách so sánh index của từ đó với index của props

### AudioPlayer Component:

    + Lấy và hiển thị đoạn ghi âm thông qua thẻ audio
    + Thêm thuộc tính controls để có thanh trượt và nút tạm dừng
    + Cần tham chiếu đến thẻ audio này thông qua 1 biến
    + Tạo 1 emit để có thể đưa về component cha
    + Thông tin được gửi cho componet cha là thời gian hiện tại của audio
    + Lặp lại các lần gửi bằng cách xử dụng Timer API là setInterval ( mỗi 10ms)
    + Thêm các sự kiện khi dừng hoặc khi chạy để xử lí thêm
    + Thêm sự kiện khi thanh trượt thay đổi, từ highlight cũng thay đổi theo

# Kết luận:

- Gần như dòng cuối của audio không thể highlight được do có sự không đồng bộ về mặt thời gian của timestamp và audio
- Phương pháp setInterval có vẻ như cho độ trễ thấp nhất
