import {
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const navbar = [
  { title: "Dashboard", url: "dashboard" },
  // { title: "Manage Roles", url: "roles" },
  // { title: "Manage Project Users", url: "users" },
  { title: "My Tickets", url: "tickets" },
];

const NavBar = () => {
  const router = useRouter();
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
          WELCOME
        </Heading>
      </Flex>
      {/* Home navbar */}
      <Flex flexDir="column">
        {navbar.map((item) => {
          return (
            <Box
              p={5}
              onClick={() => router.push(`/${item.url}`)}
              key={item.title}
              cursor="pointer"
            >
              <Flex flexDir="row" alignItems="center">
                <CAiOutlineUsergroupAdd color="secondary" size="25px" />
                <Text
                  fontSize={{ base: "xs", md: "sm", lg: "md" }}
                  color="primary"
                >
                  {item.title}
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
