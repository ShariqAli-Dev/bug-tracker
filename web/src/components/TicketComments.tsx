import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useMeQuery, useTicketCommentsQuery } from "../generated/graphql";
import { InputField } from "./InputField";

interface TicketCommentsProps {
  ticketId: number;
}

const initialValues = {
  comment: "",
};

const TicketComments = ({ ticketId }: TicketCommentsProps) => {
  // graphql api call grabbing the comments by the ticketId
  const [{ data, fetching: commentFetch }] = useTicketCommentsQuery({
    variables: { ticketId },
  });
  const [{ data: me, fetching: meFetch }] = useMeQuery();
  console.log(data?.ticketComments);
  return (
    <Flex
      flexDirection="column"
      alignItems="space-between"
      justifyContent="space-between"
      width="50%"
      height="15rem"
      marginTop={{ base: "2rem", md: "auto" }}
    >
      <Text width="full" textAlign="center" fontSize="2xl" fontWeight="bold">
        Comments
      </Text>
      {!commentFetch && !meFetch && (
        <Box
          width="full"
          overflowY="auto"
          maxHeight={{ base: "10rem", lg: "15rem" }}
        >
          {data?.ticketComments.map(({ id, user, message }) => (
            <Box
              display="flex"
              alignItems={me?.me?.id === user.id ? "start" : "end"}
              justifyContent="space-between"
              flexDirection="column"
              key={id}
            >
              <Text>{user.name}</Text>
              <Text>{message}</Text>
            </Box>
          ))}
        </Box>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={({ comment }) => {
          console.log("form value for comments component is", { comment });
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Flex>
              <FormControl width="80%">
                <Input
                  onChange={handleChange}
                  value={values.comment}
                  name="comment"
                  required
                  placeholder="Enter Comment"
                />
              </FormControl>
              <Button
                width="20%"
                borderRadius={0}
                type="submit"
                backgroundColor="primary"
                paddingTop={5}
                paddingBottom={5}
                rounded="xl"
                color="tertiary"
                _hover={{
                  backgroundColor: "tertiary",
                  color: "primary",
                  border: "2px",
                  borderColor: "primary",
                }}
                isLoading={isSubmitting}
              >
                Comment
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default TicketComments;
