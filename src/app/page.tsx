"use client";

import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Layout from "../../layout/page";

export default function Home() {
  return (
    <Layout>
      {/* Features Section */}
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          sx={{ mb: 4, color: "#1976d2" }}
        >
          🔥 Tính năng nổi bật
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "📸 Chia sẻ khoảnh khắc",
              desc: "Đăng tải ảnh, video và câu chuyện thú vị với bạn bè của bạn.",
            },
            {
              title: "💬 Nhắn tin & Gọi video",
              desc: "Trò chuyện và kết nối với bạn bè qua tin nhắn và cuộc gọi sắc nét.",
            },
            {
              title: "🌎 Khám phá ",
              desc: "Theo dõi những nội dung thú vị từ khắp nơi trên thế giới.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg,rgb(157, 208, 238),rgb(79, 143, 240))",
                  color: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography sx={{ opacity: 0.9 }}>{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "#1976d2",
          mt: 6,
          p: 4,
          borderRadius: 8,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
        >
          Sẵn sàng tham gia cộng đồng?
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
          Hãy tạo tài khoản ngay để khám phá những điều thú vị nhất!
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={() => (window.location.href = "/login")}
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, fontSize: "1.2rem", px: 4 }}
          >
            Tham gia 🎉
          </Button>
          <Button
            onClick={() => (window.location.href = "/register")}
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, fontSize: "1.2rem", px: 4 }}
          >
            Đăng ký 🎉
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "#1976d2",
          mt: 6,
          p: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          borderRadius: 8,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
        >
          📈 Thống kê ấn tượng
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            { label: "Người dùng", value: 100, icon: "👥" },
            { label: "Bài đăng", value: 100, icon: "📝" },
            { label: "Lượt thích", value: 100, icon: "❤️" },
          ].map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg,rgb(157, 208, 238),rgb(79, 143, 240))",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  textAlign: "center",
                  p: 4,
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                  color: "#fff",
                }}
              >
                <Typography variant="h3" fontWeight="bold">
                  {stat.icon} {stat.value.toLocaleString()}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
