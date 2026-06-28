  import { useEffect, useState } from "react";
  import api from "../api/axios";
  import { fetchProfile } from "../services/authService";
  import { getMyWorkspaces, createWorkspace } from "../services/workspaceService";
  import { useForm } from "react-hook-form";
  import { Link } from "react-router-dom";

  function Dashboard() {
    const [userProfile, setUserProfile] = useState(null);
    const [workspaces, setWorkspaces] = useState([]);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await fetchProfile();
          setUserProfile(response.data);
          console.log("User profile fetched:", response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      const fetchMyWorkspaces = async () => {
        try {
          const response = await getMyWorkspaces();
          setWorkspaces(response.data.workspace);
          console.log("My workspaces fetched:", response.data.workspace);
        } catch (error) {
          console.error("Error fetching my workspaces:", error);
        }
      };

      
      fetchUserProfile();
      fetchMyWorkspaces();
    }, []);
    
    const handleCreateWorkspace = async (data) => {
      setError(null);
      try {
        const response = await createWorkspace(data);
        setWorkspaces((prev) => [...prev, response.data.workspace]);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Create workspace failed");
      }
    };
    

    return (
      <div>
        <h1>Dashboard Page</h1>
        <br />

        {/* create workspace form */}
        <form onSubmit={handleSubmit(handleCreateWorkspace)}>
          <h1>Create Workspace</h1>
          <input
            type="name"
            placeholder="name"
            {...register("name")}
          />
          {errors?.name && <span>Name is required</span>}
          <br />
          <input
            type="description"
            placeholder="Description"
            {...register("description")}
          />
          {errors?.description && <span>Description is required</span>}
          <button type="submit">
            "Create Workspace"
          </button>
        </form>

          <div>
            <p>{userProfile?.message}</p>
            <h2>My Workspaces</h2>
            <br />
            <ul>
              {workspaces.map((workspace) => (
                <li key={workspace._id}>
                  <Link to={`/workspace/${workspace._id}`}>
                    {workspace.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </div>
    );
  }

  export default Dashboard;