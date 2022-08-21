import {
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import useUserStore from "../store/user";

const UserAvatar = chakra(FaUserAlt);

const UserActions = () => {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  const logoutUser = () => {
    logout();
    router.push("/");
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <Flex justifyContent="space-around" alignItems="center">
          <Text
            color="primary"
            display={{ base: "none", md: "flex" }}
            margin="1rem"
          >
            User Actions
          </Text>
          <UserAvatar color="secondary" size="25px" />
        </Flex>
      </MenuButton>
      <MenuList minWidth="240px" color="primary">
        <MenuItem onClick={() => router.push("profile")}>Profile</MenuItem>
        <MenuItem onClick={() => router.push("settings")}>Settings</MenuItem>

        <MenuItem onClick={logoutUser}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserActions;