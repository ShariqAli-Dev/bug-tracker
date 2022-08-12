import {
  Center,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const HamburgerIcon = chakra(GiHamburgerMenu);
const navbar = [
  { title: "Dashboard", url: "dashboard" },
  { title: "Manage Roles", url: "roles" },
  { title: "Manage Project Users", url: "users" },
  { title: "My Projects", url: "username/projects" },
  { title: "My Tickets", url: "username/tickets" },
  { title: "User Profile", url: "username" },
];

const BurgerMenu = () => {
  const router = useRouter();

  return (
    <Center display={{ base: "inline", md: "none" }}>
      <Menu>
        <MenuButton>
          <HamburgerIcon color="secondary" size="25px" />
        </MenuButton>
        <MenuList>
          {/* Dashboard */}
          <MenuItem
            color="primary"
            onClick={() => router.push("dashboard")}
            icon={<CAiOutlineUsergroupAdd color="secondary" />}
          >
            Dashboard
          </MenuItem>

          {/* Roles */}
          <MenuItem
            color="primary"
            onClick={() => router.push("roles")}
            icon={<CAiOutlineUsergroupAdd color="secondary" />}
          >
            Manage Roles
          </MenuItem>

          {/* Manage Project Users */}
          <MenuItem
            color="primary"
            onClick={() => router.push("users")}
            icon={<CAiOutlineUsergroupAdd color="secondary" />}
          >
            Manage Project Users
          </MenuItem>

          {/* My Projects */}
          <MenuItem
            color="primary"
            onClick={() => router.push("username/projects")}
            icon={<CAiOutlineUsergroupAdd color="secondary" />}
          >
            My Projects
          </MenuItem>

          {/* My Tickets */}
          <MenuItem
            color="primary"
            onClick={() => router.push("username/tickets")}
            icon={<CAiOutlineUsergroupAdd color="secondary" />}
          >
            My Tickets
          </MenuItem>

          {/*User Profile */}
          <MenuItem
            color="primary"
            onClick={() => router.push("username")}
            icon={<CAiOutlineUsergroupAdd color="secondary" />}
          >
            User Profile
          </MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
};

export default BurgerMenu;
