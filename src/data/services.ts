import { AddonService } from '../types';

export const ADDON_SERVICES: AddonService[] = [
  {
    id: 'romantic-setup',
    name: 'Combo Setup Hẹn Hò Lãng Mạn (Romantic Mission)',
    description: 'Trang trí nến thơm hoa hồng cao cấp, rải cánh hoa tươi, bong bóng lãng mạn & thiệp tình yêu viết tay theo yêu cầu.',
    price: 350000,
    category: 'romantic',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'wine-bloom',
    name: 'Vang Đỏ Nhập Khẩu & Bình Hoa Tươi',
    description: '1 chai rượu vang đỏ Chile/Pháp 750ml cao cấp kèm 2 ly pha lê & bình hoa tươi tươi tắn được chuẩn bị sẵn trong phòng.',
    price: 450000,
    category: 'romantic',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'surprise-cake',
    name: 'Bánh Kem Kỷ Niệm / Sinh Nhật Handmade',
    description: 'Bánh kem mini thiết kế tinh xảo, vị bắp béo ngậy hoặc socola ngọt ngào kèm nến pháo sáng lung linh.',
    price: 220000,
    category: 'romantic',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bubble-bath',
    name: 'Set Tắm Bọt Thảo Dược & Muối Hồng Himalaya',
    description: 'Tinh dầu tạo bọt bồng bềnh, muối khoáng hồng thư giãn cơ thể và hoa hồng thả bồn tắm thơm ngát.',
    price: 150000,
    category: 'romantic',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  },
];

export const STAY_RULES = [
  {
    id: 'rule-age',
    title: 'Quy định độ tuổi 16+',
    short: 'Chỉ tiếp nhận khách từ 16 tuổi trở lên',
    desc: '007 Staycation là không gian nghỉ dưỡng biệt lập, yên tĩnh. Chúng tôi chỉ tiếp nhận khách lưu trú từ đủ 16 tuổi trở lên và yêu cầu gửi ảnh CCCD/Passport để đăng ký lưu trú online.',
    icon: 'UserCheck',
    critical: false,
  },
  {
    id: 'rule-smoking',
    title: 'Nghiêm cấm Hút Thuốc & Vape 100%',
    short: 'Phạt 1.000.000đ chi phí xử lý ozone khử mùi',
    desc: 'Để giữ gìn không khí trong lành cho khách tiếp theo, mọi hành vi hút thuốc lá truyền thống, thuốc lá điện tử, pod, vape trong toàn bộ phòng đều bị cấm tuyệt đối. Vi phạm chịu phụ phí 1.000.000đ.',
    icon: 'Ban',
    critical: true,
  },
  {
    id: 'rule-capacity',
    title: 'Tiêu chuẩn 2 người / phòng',
    short: 'Phụ thu khách thứ 3: 70.000đ/người',
    desc: 'Mỗi căn phòng được thiết kế tối ưu nhất cho 02 khách. Trường hợp có thêm khách thứ 3, quý khách vui lòng thông báo trước để chuẩn bị thêm chăn gối và chịu phụ thu 70.000đ/người.',
    icon: 'Users',
    critical: false,
  },
  {
    id: 'rule-checkout',
    title: 'Thời gian Check-out đúng giờ',
    short: 'Trễ từ 10 phút tính phụ thu 100.000đ/giờ',
    desc: 'Đội ngũ vệ sinh cần thời gian tiệt trùng và thay mới toàn bộ chăn ga gối cho vị khách tiếp theo. Quý khách vui lòng check-out đúng giờ. Trễ từ 10 phút sẽ áp dụng phụ phí 100.000đ.',
    icon: 'Clock',
    critical: false,
  },
  {
    id: 'rule-cooking',
    title: 'Quy định Nấu Ăn',
    short: 'Chỉ nấu ở phòng có trang bị bếp riêng',
    desc: 'Khách chỉ được nấu nướng tại các phòng có bếp riêng (như Mission 003). Vui lòng dọn dẹp sạch sẽ sau khi nấu. Các phòng không có bếp nghiêm cấm mang bếp lẩu/nướng tự phát vào phòng.',
    icon: 'Flame',
    critical: false,
  },
  {
    id: 'rule-clean',
    title: 'Vệ sinh & Bảo quản tài sản',
    short: 'Phụ thu giặt ủi vết bẩn khó tẩy',
    desc: 'Vui lòng không làm ố màu rượu vang, son môi, màu vẽ khó tẩy lên chăn nệm drap giường trắng hoặc làm rơi vỡ đồ sứ bồn tắm. Chi phí giặt ủi đặc biệt hoặc bồi hoàn sẽ được tính theo thực tế.',
    icon: 'Sparkles',
    critical: false,
  },
];

export const CHECKIN_STEPS = [
  {
    step: '01',
    title: 'Đặt phòng Trực tuyến',
    desc: 'Chọn phòng Mission yêu thích, ngày giờ lưu trú và nhận mã đặt phòng bí mật (Booking Code).',
  },
  {
    step: '02',
    title: 'Xác thực Thông tin & CCCD',
    desc: 'Điền thông tin và tải ảnh CCCD/Passport bảo mật để kích hoạt hệ thống đăng ký lưu trú tự động.',
  },
  {
    step: '03',
    title: 'Nhận Mật Mã Mở Khóa (Smartlock)',
    desc: 'Trước giờ nhận phòng, hệ thống tự động gửi mật khẩu số riêng của cửa phòng và mật khẩu Wifi qua tin nhắn/web.',
  },
  {
    step: '04',
    title: 'Tự do Khám Phá & Tận Hưởng',
    desc: 'Đến nơi, bấm mật khẩu vào phòng trực tiếp mà không cần chờ đợi lễ tân, hoàn toàn riêng tư và kín đáo.',
  },
];

export const FAQS = [
  {
    q: '007 Staycation có lễ tân trực tiếp tại cơ sở không?',
    a: 'Không, 007 Staycation hoạt động theo mô hình Tự Động Check-in 100% (No Receptionist). Toàn bộ hệ thống cửa sử dụng khóa mã số thông minh Smartlock. Bạn sẽ nhận được mật mã riêng vào giờ check-in, đảm bảo sự riêng tư và tự do tối đa.',
  },
  {
    q: 'Tôi có thể thuê phòng theo giờ hay qua đêm?',
    a: 'Có, chúng tôi cung cấp 3 hình thức linh hoạt: Theo Giờ (Short Stay gói 3 giờ hoặc giờ phát sinh), Qua Đêm (Overnight từ 20:00 đến 11:00 hôm sau) và Theo Ngày Đêm (Daily từ 14:00 đến 12:00 hôm sau).',
  },
  {
    q: 'Chính sách độ tuổi 16+ được áp dụng như thế nào?',
    a: 'Tất cả khách lưu trú tại 007 Staycation phải từ đủ 16 tuổi trở lên. Khi hoàn tất đặt phòng, quý khách cần cung cấp số CCCD/Passport để xác thực thông tin theo quy định quản lý lưu trú của địa phương.',
  },
  {
    q: 'Tôi muốn setup phòng lãng mạn cho bạn gái/người yêu thì làm thế nào?',
    a: 'Bạn chỉ cần tích chọn "Combo Setup Hẹn Hò Lãng Mạn" hoặc "Vang Đỏ & Hoa Tươi" ngay trong form đặt phòng online, hoặc nhắn tin Zalo Hotline 0899 772 567. Đội ngũ 007 sẽ chuẩn bị phòng lung linh sẵn sàng trước khi bạn bước vào.',
  },
  {
    q: 'Có chỗ đỗ xe máy và xe ô tô không?',
    a: 'Cả 2 chi nhánh đều có chỗ đỗ xe máy an toàn trong khuôn viên có camera an ninh 24/7. Tại Chi nhánh 1 (40 Trần Quốc Toản) có sân rộng rãi đỗ xe ô tô 4-7 chỗ miễn phí thoải mái. Tại Chi nhánh 2 có bãi đỗ ô tô ngay gần mặt đường.',
  },
];
