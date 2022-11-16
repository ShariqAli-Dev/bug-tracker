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
import { useMeQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const HamburgerIcon = chakra(GiHamburgerMenu);

const BurgerMenu: NextPage = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

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

          <MenuItem
            onClick={() => router.push("/tickets")}
            icon={<CAiOutlineUsergroupAdd />}
          >
            My Tickets
          </MenuItem>

          {!fetching && data?.me?.role === "admin" ? (
            <MenuItem
              onClick={() => router.push("/adminstration")}
              icon={<CAiOutlineUsergroupAdd />}
            >
              Adminstration
            </MenuItem>
          ) : (
            <></>
          )}
        </MenuList>
      </Menu>
    </Center>
  );
};

export default withUrqlClient(createUrqlClient)(BurgerMenu);
