import { Box, Container, Flex, Text } from "@chakra-ui/react";

const TicketDetails = () => {
  // ticket api call
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

export default TicketDetails;
