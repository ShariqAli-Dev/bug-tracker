import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaBug } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdOutlineTask } from "react-icons/md";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const UserIcon = chakra(AiOutlineUsergroupAdd);
const TicketIcon = chakra(MdOutlineTask);
const DashboardIcon = chakra(MdOutlineSpaceDashboard);

const NavBar = () => {
  const router = useRouter();
  const [{ fetching }, logout] = useLogoutMutation();
  const [{ data, fetching: meFetch }] = useMeQuery();
  return (
    <Stack>
      {/* Home title, user imgage */}
      <Flex color="primary" margin={3} flexDir="column" alignItems="center">
        <FaBug style={{ margin: "1rem" }} size={45} />

        <Heading
          as="h2"
          size={{ base: "xs", md: "sm", xl: "md" }}
          textAlign="center"
          color="primary"
        >
          Bug Tracker
        </Heading>
        {!meFetch && (
          <Text align="center" color="primary">
            {data?.me?.role}
          </Text>
        )}
      </Flex>
      {/* Home navbar */}
      <Flex flexDir="column">
        <Box
          p={5}
          onClick={() => router.push(`/dashboard`)}
          key="dashboard"
          cursor="pointer"
        >
          <Flex flexDir="row" alignItems="center">
            <DashboardIcon color="secondary" size="25px" />
            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} color="primary">
              Dashbaord
            </Text>
          </Flex>
        </Box>

        <Box
          p={5}
          onClick={() => router.push(`/dashboard`)}
          key="tickets"
          cursor="pointer"
        >
          <Flex flexDir="row" alignItems="center">
            <TicketIcon color="secondary" size="25px" />
            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} color="primary">
              My Tickets
            </Text>
          </Flex>
        </Box>

        {!meFetch && data?.me?.role === "admin" ? (
          <Box
            p={5}
            onClick={() => router.push(`/adminstration`)}
            key="adminstration"
            cursor="pointer"
          >
            <Flex
              flexDir="row"
              alignItems="center"
              color="
            pirmary"
            >
              <UserIcon color="primary" size="25px" />
              <Text
                fontSize={{ base: "xs", md: "sm", lg: "md" }}
                color="primary"
              >
                Adminstration
              </Text>
            </Flex>
          </Box>
        ) : (
          <></>
        )}

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
