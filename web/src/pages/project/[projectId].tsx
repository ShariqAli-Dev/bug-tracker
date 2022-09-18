import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useProjectQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ProjectDetails: NextPage<{ projectId: number }> = ({ projectId }) => {
  const [{ data, fetching }] = useProjectQuery({ variables: { projectId } });
  return <div>I am project details page</div>;
};

ProjectDetails.getInitialProps = ({ query }: any) => {
  return { projectId: parseInt(query.projectId) };
};

export default withUrqlClient(createUrqlClient)(ProjectDetails);
