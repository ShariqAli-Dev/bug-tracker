import {
  Button,
  Center,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSpaceDashboard, MdOutlineTask } from "react-icons/md";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const UserIcon = chakra(AiOutlineUsergroupAdd);
const HamburgerIcon = chakra(GiHamburgerMenu);
const TicketsIcon = chakra(MdOutlineTask);
const DashboardIcon = chakra(MdOutlineSpaceDashboard);

const BurgerMenu: NextPage = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();

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
            icon={<DashboardIcon />}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            onClick={() => router.push("/tickets")}
            icon={<TicketsIcon />}
          >
            My Tickets
          </MenuItem>

          {!fetching && data?.me?.role === "admin" ? (
            <MenuItem
              onClick={() => router.push("/adminstration")}
              icon={<UserIcon />}
            >
              Adminstration
            </MenuItem>
          ) : (
            <></>
          )}
          <MenuItem display="flex" alignItems="center">
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
