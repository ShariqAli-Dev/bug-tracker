import {
  Center,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const HamburgerIcon = chakra(GiHamburgerMenu);

const BurgerMenu: NextPage = () => {
  const router = useRouter();
  const [{ fetching }, logout] = useLogoutMutation();

  return (
    <Center display={{ base: "inline", md: "none" }}>
      <Menu>
        <MenuButton>
          <HamburgerIcon size="25px" />
        </MenuButton>
        <MenuList>
          {/* Dashbosard */}
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

          <MenuItem>
            <Button
              size="xs"
              color="tertiary"
              backgroundColor="primary"
              border="2px"
              padding={3}
              _hover={{
                backgroundColor: "tertiary",
                color: "primary",
                border: "2px",
                borderColor: "primary",
              }}
              disabled={fetching}
              onClick={async () => {
                await logout({});
                await router.push("/");
                router.reload();
              }}
            >
              Logout
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
};

export default withUrqlClient(createUrqlClient)(BurgerMenu);
