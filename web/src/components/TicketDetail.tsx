import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useTicketQuery } from "../generated/graphql";

interface TicketDetailProps {
  id: number;
}

const TicketDetail = ({ id }: TicketDetailProps) => {
  const [{ data }] = useTicketQuery({ variables: { ticketId: id } });
  console.log({ data });
  return (
    <>
      <Box>
        <Text>Selected Ticket Info</Text>
        <Flex>
          {/* Ticket Info */}
          <Container>
            <Flex>
              {/* Map Ticket section */}
              <Box>
                <Text>Ticket Title</Text>
                <Text>Create Schema</Text>
              </Box>
            </Flex>
          </Container>
          {/* Comments */}
          <Container></Container>
        </Flex>
      </Box>
    </>
  );
};

export default TicketDetail;
