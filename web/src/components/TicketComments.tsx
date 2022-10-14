import {
  Box,
  chakra,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useMeQuery,
  useTicketCommentsQuery,
} from "../generated/graphql";
import { FaTrash } from "react-icons/fa";

interface TicketCommentsProps {
  ticketId: number;
}

const CFaTrash = chakra(FaTrash);

const initialValues = {
  comment: "",
};

const TicketComments = ({ ticketId }: TicketCommentsProps) => {
  const [{ data, fetching: commentFetch }] = useTicketCommentsQuery({
    variables: { ticketId },
  });
  const [{ data: me, fetching: meFetch }] = useMeQuery();
  const [, createComment] = useCreateCommentMutation();
  const [, deleteComment] = useDeleteCommentMutation();

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
          borderColor="red"
          border="1px"
        >
          {data?.ticketComments.map(({ id, user, message }) => (
            <Flex
              alignItems={me?.me?.id === user.id ? "end" : "start"}
              justifyContent="space-between"
              flexDirection="column"
              key={id}
              padding={1}
              color="primary"
            >
              <Flex
                color="primary"
                fontWeight="semibold"
                fontSize="lg"
                alignItems="center"
              >
                {me?.me?.id === user.id && (
                  <CFaTrash
                    cursor="pointer"
                    onClick={async () =>
                      await deleteComment({ deleteCommentId: id })
                    }
                    marginRight={{ base: 2, md: 4 }}
                  />
                )}
                {user.name}
              </Flex>
              <Text>{message}</Text>
            </Flex>
          ))}
        </Box>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async ({ comment }, { resetForm }) => {
          try {
            await createComment({
              options: { message: comment, ticketId: ticketId },
            });
            resetForm();
          } catch (err) {
            console.log(err);
          }
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
