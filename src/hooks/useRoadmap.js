import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxiosPublic from "./useAxiosPublic";

const useRoadmap = () => {
  const axiosPublic = UseAxiosPublic();
  const fetchRoadmaps = async () => {
    const res = await axiosPublic.get("/roadmaps");
    return res.data;
  };
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
  return { roadmaps, isLoading, error };
};

export default useRoadmap;
