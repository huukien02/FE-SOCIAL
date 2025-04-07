import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Dashboard, People, Article } from "@mui/icons-material";
import { useProfile } from "@/services/authService/profileService";
import Link from "next/link";

const Sidebar = () => {
  const { data: dataProfile } = useProfile();

  return (
    <Drawer variant="permanent" sx={{ width: 300, flexShrink: 0 }}>
      <List>
        <ListItem>
          <Avatar
            alt="Admin"
            src={dataProfile?.data.avatar}
            sx={{ margin: "0 auto" }}
          />
        </ListItem>
        <ListItem component={Link} href="/admin">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} href="/admin/users">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem component={Link} href="/admin/blogs">
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="Blogs" />
        </ListItem>
      </List>
    </Drawer>
  );
};
export default Sidebar;
