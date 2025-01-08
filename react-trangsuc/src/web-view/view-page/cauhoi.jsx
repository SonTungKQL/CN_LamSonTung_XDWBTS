import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import {
  ExpandMore,
  AccessAlarm,
  Star,
  Spa,
  FitnessCenter,
  Pool,
  ChildFriendly,
  Pets,
  LocalHospital,
  EmojiNature,
} from "@mui/icons-material";

const faqs = [
  {
    question: "Cách bảo quản trang sức đúng cách?",
    answer:
      "Để bảo quản trang sức đúng cách, bạn nên tránh tiếp xúc với hóa chất như mỹ phẩm, nước hoa, xà phòng. Nên làm sạch trang sức định kỳ với nước ấm pha xà phòng nhẹ. Hãy bảo quản chúng trong các hộp đựng có lớp lót mềm và tránh để chung với các đồ vật khác để tránh trầy xước.",
    icon: <Spa />,
  },
  {
    question: "Làm sao để làm sạch trang sức vàng?",
    answer:
      "Để làm sạch trang sức vàng, bạn có thể dùng bàn chải mềm và dung dịch xà phòng pha loãng với nước ấm. Dùng miếng vải mềm lau khô sau khi rửa. Tránh sử dụng các hóa chất tẩy mạnh hoặc các bàn chải cứng vì chúng có thể gây xước bề mặt của vàng.",
    icon: <Star />,
  },
  {
    question: "Trang sức bạc có bị xỉn màu không?",
    answer:
      "Trang sức bạc có thể bị xỉn màu theo thời gian do tiếp xúc với không khí, chất bẩn hoặc các hóa chất. Để làm sáng bạc, bạn có thể sử dụng dung dịch chuyên dụng hoặc dùng chanh pha với baking soda để lau chùi. Sau khi làm sạch, hãy lau lại bằng khăn mềm để bảo vệ bề mặt.",
    icon: <AccessAlarm />,
  },
  {
    question: "Có nên đeo trang sức khi tắm không?",
    answer:
      "Nên tháo trang sức khi tắm để tránh tiếp xúc với nước và các chất tẩy rửa có trong xà phòng, dầu gội. Nước có thể làm giảm độ bóng và khiến trang sức bị xỉn màu, đặc biệt là các loại trang sức bạc và vàng.",
    icon: <FitnessCenter />,
  },
  {
    question: "Trang sức có bị ảnh hưởng khi đi ngủ không?",
    answer:
      "Trang sức có thể bị ảnh hưởng khi đi ngủ, đặc biệt là các món trang sức có thiết kế phức tạp. Khi ngủ, bạn dễ bị vướng vào chăn hoặc gối, gây hư hỏng hoặc trầy xước trang sức. Vì vậy, bạn nên tháo trang sức trước khi đi ngủ.",
    icon: <ChildFriendly />,
  },
  {
    question: "Làm sao để giữ trang sức luôn sáng bóng?",
    answer:
      "Để giữ trang sức luôn sáng bóng, bạn cần làm sạch định kỳ bằng dung dịch chuyên dụng và bảo quản trong các hộp trang sức kín, tránh tiếp xúc với hóa chất và nước. Đặc biệt, tránh để trang sức tiếp xúc với ánh sáng mặt trời quá lâu vì điều này có thể làm giảm độ sáng bóng.",
    icon: <EmojiNature />,
  },
  {
    question: "Tại sao trang sức bị mờ màu?",
    answer:
      "Trang sức có thể bị mờ màu do tiếp xúc lâu dài với không khí, dầu mỡ từ cơ thể, hoặc các chất tẩy rửa. Để khôi phục vẻ sáng bóng, bạn có thể sử dụng các dung dịch làm sạch chuyên dụng hoặc mang đến các cửa hàng sửa chữa trang sức.",
    icon: <Pets />,
  },
  {
    question: "Trang sức vàng có thể bị biến dạng không?",
    answer:
      "Trang sức vàng có thể bị biến dạng nếu chịu tác động lực mạnh, đặc biệt là các loại trang sức có thiết kế mỏng manh. Bạn nên tránh để trang sức va chạm mạnh với các vật cứng và lưu trữ chúng ở nơi an toàn, tránh để chung với các vật dụng khác.",
    icon: <Pool />,
  },
  {
    question: "Có cần tháo trang sức khi đi bơi không?",
    answer:
      "Có, bạn nên tháo trang sức khi đi bơi để tránh tiếp xúc với hóa chất trong hồ bơi như clo, có thể làm hỏng các chi tiết trên trang sức. Ngoài ra, tiếp xúc với nước mặn trong biển cũng có thể gây hư hại cho các kim loại và đá quý trên trang sức.",
    icon: <LocalHospital />,
  },
  {
    question: "Trang sức của tôi bị mờ, có cách nào khôi phục không?",
    answer:
      "Bạn có thể khôi phục vẻ sáng bóng cho trang sức bằng cách sử dụng dung dịch làm sạch chuyên dụng, hoặc dùng chanh và baking soda để chà nhẹ lên bề mặt trang sức. Nếu trang sức quá mờ hoặc có vết trầy, bạn có thể mang đến các cửa hàng trang sức để được làm mới.",
    icon: <Spa />,
  },
];

function FAQPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#f4f6f9",
        padding: 4,
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          fontWeight: 600,
          color: "#1abc9c",
          marginBottom: 3,
        }}
        align="center"
        gutterBottom
      >
        Tổng hợp các câu hỏi phổ biến và câu trả lời chi tiết
      </Typography>

      <Box sx={{ marginTop: 3 }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                backgroundColor: "#ffffff",
                color: "#2c3e50",
                fontWeight: "bold",
                "&.Mui-expanded": {
                  backgroundColor: "#1abc9c",
                  color: "#ffffff",
                },
                padding: "16px 24px",
              }}
            >
              {faq.icon}
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "#f9f9f9",
                padding: "16px 24px",
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default FAQPage;
