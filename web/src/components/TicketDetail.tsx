import { Box, Container, Flex, Text } from "@chakra-ui/react";
import {
  useAssignedDevelopersQuery,
  useTicketQuery,
} from "../generated/graphql";

interface TicketDetailProps {
  ticketId: number;
}

const TicketDetail = ({ ticketId }: TicketDetailProps) => {
  const [{ data: ticketData, fetching: ticketFetch }] = useTicketQuery({
    variables: { ticketId },
  });

  const [{ data: devData, fetching: devFetch }] = useAssignedDevelopersQuery({
    variables: { ticketId },
  });

  // console.log({
  //   ticket: ticketData?.ticket,
  //   devs: devData?.assignedDevelopers,
  // });

  if (ticketFetch || devFetch) {
    return <></>;
  }

  return (
    <>
      <Text width="full" textAlign="center" fontSize="2xl" fontWeight="bold">
        Ticket Details
      </Text>
      <Box display="flex" margin="auto" height="40%" alignItems="center">
        <Container height="full">
          {/* Ticket Detail */}
          <Flex
            height="75%"
            width="full"
            justifyContent="space-around"
            flexDirection="column"
          >
            {/* Top Half */}
            <Flex width="full" justifyContent="space-between">
              <Box>
                <Text fontWeight="medium" textColor="primary" fontSize="sm">
                  Title
                </Text>
                <Text
                  backgroundColor="tertiary"
                  textColor="secondary"
                  padding={0.5}
                  borderRadius="lg"
                >
                  {ticketData?.ticket?.title}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  Author
                </Text>
                <Text>{ticketData?.ticket?.creator}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  Description
                </Text>
                <Text>{ticketData?.ticket?.description}</Text>
              </Box>
            </Flex>

            {/* Bottom Half */}
            <Flex width="full" justifyContent="space-between">
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  Status
                </Text>
                <Text
                  backgroundColor="tertiary"
                  textColor="secondary"
                  padding={0.5}
                  borderRadius="lg"
                >
                  {ticketData?.ticket?.status}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  Priority
                </Text>
                <Text
                  backgroundColor="tertiary"
                  textColor="secondary"
                  padding={0.5}
                  borderRadius="lg"
                >
                  {ticketData?.ticket?.priority}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  Type
                </Text>
                <Text
                  backgroundColor="tertiary"
                  textColor="secondary"
                  padding={0.5}
                  borderRadius="lg"
                >
                  {ticketData?.ticket?.type}
                </Text>
              </Box>
            </Flex>
          </Flex>

          {/* Assigned Developers */}
          <Box height="25%">
            <Text fontWeight="medium" fontSize="sm">
              Assigned Developers
            </Text>
            <Text>
              {devData?.assignedDevelopers.map(({ user }, udx) => {
                // if the index is the last, return just the name
                if (udx === devData.assignedDevelopers.length - 1) {
                  return user.name;
                }
                // else, add the comma
                return user.name + ", ";
              })}
            </Text>
          </Box>
        </Container>
        {/* Comments */}
        <Container>Comments</Container>
      </Box>
    </>
  );
};

export default TicketDetail;
