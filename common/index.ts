export const BLOGS_FEELING = [
  { value: 0, icon: "", label: "Không chọn" },
  { value: 1, icon: "😍", label: "Yêu thương" },
  { value: 2, icon: "😢", label: "Buồn" },
  { value: 3, icon: "😋", label: "Thèm" },
  { value: 4, icon: "😡", label: "Tức giận" },
  { value: 5, icon: "😎", label: "Đẹp zaii" },
];

export const BLOGS_REACTION = [
  { value: 0, icon: "👍", label: "Thích" },
  { value: 1, icon: "❤️", label: "Yêu thích" },
  { value: 2, icon: "😂", label: "Haha" },
  { value: 3, icon: "😯", label: "Wow" },
  { value: 4, icon: "😡", label: "Phẫn nộ" },
];

export type Reaction = { id: number; type: number };

export const countReactions = (reactions: Reaction[]) => {
  const count: { [key: number]: number } = {};

  // Đếm số lần xuất hiện của từng type
  reactions.forEach((reaction) => {
    count[reaction.type] = (count[reaction.type] || 0) + 1;
  });

  // Ánh xạ type với icon và tạo thông báo, chỉ hiển thị nếu count > 0
  return BLOGS_REACTION.map((reaction) => {
    const countValue = count[reaction.value] || 0;
    return { ...reaction, count: countValue };
  });
};
export const getFeelingIcon = (value: any): string => {
  const feeling = BLOGS_FEELING.find((item) => item.value === value);
  return feeling ? feeling.icon : "";
};

export const formatDateTime = (created_at: string) => {
  const date = new Date(created_at);

  // Lấy ngày, tháng, năm, giờ và phút
  const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Trả về chuỗi định dạng "dd/MM/yyyy - HH:mm"
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
