import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useProfile } from "@/services/authService/profileService";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { useLogout } from "@/services/authService/logoutService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ConfirmationModal from "../../components/modalConfirm";

export const Header = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);

  const { data: dataProfile, refetch } = useProfile();
  const { mutate: mutateLogout } = useLogout();

  const handleLogout = () => {
    const accessToken = `${Cookies.get("accessToken")}`.replace(/"/g, "");
    if (accessToken) {
      mutateLogout(accessToken, {
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message;
          toast.error(errorMessage);
        },
        onSuccess: (data: { message: string }) => {
          Cookies.remove("accessToken");
          router.push("/login");
          toast.success(data.message);
        },
      });
    }
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setOpenModal(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Social Media
        </Typography>

        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/blogs">
            Blogs
          </Button>
          {dataProfile && (
            <>
              <Button color="inherit" component={Link} href="/chat">
                Chat
              </Button>
              <Button color="inherit" component={Link} href="/call">
                Call
              </Button>
              <Button color="inherit" component={Link} href="/profile">
                Profile
              </Button>
            </>
          )}

          {!dataProfile ? (
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => setOpenModal(true)}>
                Logout
              </Button>
              <Button>
                <Avatar
                  sx={{ border: "1px solid lightgray" }}
                  alt={dataProfile?.name}
                  src={dataProfile?.data.avatar}
                />
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmLogout}
        message="Bạn có muốn đăng xuất không ?"
      />
    </AppBar>
  );
};
