import { Box, Flex, Text } from "@chakra-ui/react";
import {
  useAssignedDevelopersQuery,
  useTicketQuery,
} from "../generated/graphql";
import TicketComments from "./TicketComments";

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

  if (ticketFetch || devFetch) {
    return <></>;
  }

  return (
    <Box marginTop={{ base: "8rem", md: "auto" }}>
      <Text width="full" textAlign="center" fontSize="2xl" fontWeight="bold">
        Ticket Details
      </Text>
      <Flex
        margin="auto"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          {/* Ticket Detail */}
          <Flex justifyContent="space-around" width="full">
            {/* 1/3 */}
            <Box>
              <Box m="1rem">
                <Text fontWeight="medium" textColor="primary" fontSize="sm">
                  Title
                </Text>
                <Text textColor="secondary" padding={0.5} borderRadius="lg">
                  {ticketData?.ticket?.title}
                </Text>
              </Box>
              <Box m="1rem">
                <Text fontWeight="medium" fontSize="sm">
                  Status
                </Text>
                <Text>
                  <span
                    style={{
                      backgroundColor: "#EBEBEB",
                      color: "#7A7A7A",
                      padding: "2px",
                      borderRadius: ".5rem",
                    }}
                  >
                    {ticketData?.ticket?.status}
                  </span>
                </Text>
              </Box>
            </Box>

            {/* 2/3 */}
            <Box>
              <Box m="1rem">
                <Text fontWeight="medium" fontSize="sm">
                  Author
                </Text>
                <Text>{ticketData?.ticket?.creator}</Text>
              </Box>
              <Box m="1rem">
                <Text fontWeight="medium" fontSize="sm">
                  Priority
                </Text>
                <Text>
                  <span
                    style={{
                      backgroundColor: "#EBEBEB",
                      color: "#7A7A7A",
                      padding: "2px",
                      borderRadius: ".5rem",
                    }}
                  >
                    {ticketData?.ticket?.priority}
                  </span>
                </Text>
              </Box>
            </Box>

            {/* 3/3 */}
            <Box>
              <Box m="1rem">
                <Text fontWeight="medium" fontSize="sm">
                  Description
                </Text>
                <Text>{ticketData?.ticket?.description}</Text>
              </Box>
              <Box m="1rem">
                <Text fontWeight="medium" fontSize="sm">
                  Type
                </Text>
                <Text>
                  <span
                    style={{
                      backgroundColor: "#EBEBEB",
                      color: "#7A7A7A",
                      padding: "2px",
                      borderRadius: ".5rem",
                    }}
                  >
                    {ticketData?.ticket?.type}
                  </span>
                </Text>
              </Box>
            </Box>
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
        </Box>
        {/* Comments */}
        <TicketComments ticketId={ticketId} />
      </Flex>
    </Box>
  );
};

export default TicketDetail;
