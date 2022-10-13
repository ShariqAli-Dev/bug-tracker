import { Box, Container, Text } from "@chakra-ui/react";

interface TicketCommentsProps {}

const TicketComments = ({}: TicketCommentsProps) => {
  return (
    <Box width="50%">
      <Text>Comments</Text>
      <Container>comment box</Container>
    </Box>
  );
};

export default TicketComments;
