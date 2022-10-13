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
import { InputField } from "./InputField";

interface TicketCommentsProps {
  ticketId: number;
}

const initialValues = {
  comment: "",
};

const TicketComments = (props: TicketCommentsProps) => {
  // graphql api call grabbing the comments by the ticketId
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
      <Container>
        <Box overflowY="auto" maxHeight={{ base: "10rem", lg: "15rem" }}>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
        </Box>
      </Container>
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
