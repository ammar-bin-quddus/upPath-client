import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxiosPublic from "./useAxiosPublic";

const fetchRoadmaps = async () => {
  const res = await UseAxiosPublic.get("/roadmaps");
  return res.data;
};

const useRoadmap = () => {
  const { user } = useAuth();
  const {
    data: roadmaps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmaps,
    enabled: !!user?.email,
  });
  return {roadmaps, isLoading, error}
};

export default useRoadmap;
