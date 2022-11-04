import {
  Center,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const HamburgerIcon = chakra(GiHamburgerMenu);

const BurgerMenu: NextPage = () => {
  const router = useRouter();

  return (
    <Center display={{ base: "inline", md: "none" }}>
      <Menu>
        <MenuButton>
          <HamburgerIcon size="25px" />
        </MenuButton>
        <MenuList>
          {/* Dashboard */}
          <MenuItem
            onClick={() => router.push("/dashboard")}
            icon={<CAiOutlineUsergroupAdd />}
          >
            Dashboard
          </MenuItem>

          {/* Roles */}
          {/* <MenuItem
            onClick={() => router.push("roles")}
            icon={<CAiOutlineUsergroupAdd />}
          >
            Manage Roles
          </MenuItem> */}

          {/* Manage Project Users */}
          {/* <MenuItem
            onClick={() => router.push("users")}
            icon={<CAiOutlineUsergroupAdd />}
          >
            Manage Project Users
          </MenuItem> */}

          {/* My Tickets */}
          <MenuItem
            onClick={() => router.push("username/tickets")}
            icon={<CAiOutlineUsergroupAdd />}
          >
            My Tickets
          </MenuItem>

          {/*User Profile */}
          {/* <MenuItem
            onClick={() => router.push("username")}
            icon={<CAiOutlineUsergroupAdd />}
          >
            User Profile
          </MenuItem> */}
        </MenuList>
      </Menu>
    </Center>
  );
};

export default BurgerMenu;
