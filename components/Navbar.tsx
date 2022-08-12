import {
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import useUserStore from "../store/user";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const navbar = [
  { title: "Dashboard", url: "dashboard" },
  { title: "Manage Roles", url: "roles" },
  { title: "Manage Project Users", url: "users" },
  { title: "My Projects", url: "username/projects" },
  { title: "My Tickets", url: "username/tickets" },
  { title: "User Profile", url: "username" },
];

const NavBar = () => {
  const username = useUserStore((state) => state.username);

  return (
    <Stack>
      {/* Home title, user imgage */}
      <Flex color="primary" margin={3} flexDir="row" alignItems="center">
        <Image
          w="30%"
          alt="user icon"
          src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
        />
        <Heading
          as="h2"
          size={{ base: "xs", md: "sm", xl: "md" }}
          textAlign="center"
          color="primary"
        >
          WELCOME {username}
        </Heading>
      </Flex>
      {/* Home navbar */}
      <Flex flexDir="column">
        {navbar.map((item) => {
          return (
            <Box p={5} key={item.title}>
              <Flex flexDir="row" alignItems="center">
                <CAiOutlineUsergroupAdd color="secondary" size="25px" />
                <Text
                  fontSize={{ base: "xs", md: "sm", lg: "md" }}
                  color="primary"
                >
                  <Link href={item.url}>{item.title}</Link>
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default NavBar;
