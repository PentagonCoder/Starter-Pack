import { useEffect, useState } from "react";
import {getWorkspaceById} from "../services/workspaceService";
import { useParams } from "react-router-dom";
import ProjectList from "../components/ProjectList";
import InviteForm from "../components/InviteForm"

function WorkspaceDetail() {
  const [workspace, setWorkspace] = useState(null);
  const [error, setError] = useState(null);
  const { workspaceId } = useParams();

  useEffect(() => {

    const fetchWorkspace = async () => {
      try {
        const response = await getWorkspaceById(workspaceId);
        setWorkspace(response.data.workspace);
        // console.log("Workspace fetched:", response.data.workspace);
      } catch (error) {
        console.error("Error fetching workspace:", error);
        setError("Failed to load workspace");
      }
    };

    fetchWorkspace();
  }, [workspaceId]);


  return (
    <div>
      <h1>{workspace?.name}</h1>
      <p>{workspace?.description}</p>
      <p>Workspace owner: {workspace?.owner?.name}</p>

      {error && <span style={{ color: "red" }}>{error}</span>}
      <ProjectList workspaceId={workspaceId} />

      <ul>
        {workspace?.members?.map((member) => (
          <li key={member._id}>
            {member.user.name} ({member.role})
            {/* <p>Role: {member.role}</p> */}
          </li>
        ))}
      </ul>

      <InviteForm workspaceId={workspaceId}/>
    </div>
  );
}

export default WorkspaceDetail; 

