import { Box, Container, Flex, Text } from "@chakra-ui/react";
import {
  useAssignedDeveloperQuery,
  useTicketQuery,
} from "../generated/graphql";

interface TicketDetailProps {
  ticketId: number;
}

const TicketDetail = ({ ticketId }: TicketDetailProps) => {
  const [{ data: ticketData, fetching: ticketFetch }] = useTicketQuery({
    variables: { ticketId },
  });

  const [{ data: devData, fetching: devFetch }] = useAssignedDeveloperQuery({
    variables: { ticketId },
  });

  console.log({ ticket: ticketData?.ticket, devs: devData?.assignedDeveloper });

  if (ticketFetch || devFetch) {
    return <></>;
  }

  return (
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
          <Flex width="full" justifyContent="space-around">
            <Box>
              <Text>Title</Text>
              <Text>{ticketData?.ticket?.title}</Text>
            </Box>
            <Box>
              <Text>Author</Text>
              <Text>{ticketData?.ticket?.creator}</Text>
            </Box>
            <Box>
              <Text>Description</Text>
              <Text>{ticketData?.ticket?.description}</Text>
            </Box>
          </Flex>

          {/* Bottom Half */}
          <Flex width="full" justifyContent="space-around">
            <Box>
              <Text>Status</Text>
              <Text>{ticketData?.ticket?.status}</Text>
            </Box>
            <Box>
              <Text>Priority</Text>
              <Text>{ticketData?.ticket?.priority}</Text>
            </Box>
            <Box>
              <Text>Type</Text>
              <Text>{ticketData?.ticket?.type}</Text>
            </Box>
          </Flex>
        </Flex>

        {/* Assigned Developers */}
        <Box height="25%">I am assigned devs</Box>
      </Container>

      {/* Comments */}
      <Container>Comments</Container>
    </Box>
  );
};

export default TicketDetail;
