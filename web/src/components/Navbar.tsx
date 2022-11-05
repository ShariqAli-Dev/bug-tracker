import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useLogoutMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { FaBug } from "react-icons/fa";

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const navbar = [
  { title: "Dashboard", url: "dashboard" },
  // { title: "Manage Roles", url: "roles" },
  // { title: "Manage Project Users", url: "users" },
  { title: "My Tickets", url: "tickets" },
];

const NavBar = () => {
  const router = useRouter();
  const [{ fetching }, logout] = useLogoutMutation();
  return (
    <Stack>
      {/* Home title, user imgage */}
      <Flex color="primary" margin={3} flexDir="column" alignItems="center">
        <FaBug size={45} />
        <Text fontSize="xl">Bug Tracker</Text>
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
      </Flex>
    </Stack>
  );
};

export default withUrqlClient(createUrqlClient)(NavBar);
