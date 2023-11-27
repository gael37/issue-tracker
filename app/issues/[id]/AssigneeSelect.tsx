"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter()
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
    router.refresh();
  };

  // const [users, setUsers] = useState<any[]>([])

  // const getUsers = async () => {
  //   try {
  //     const { data } = await axios.get('/api/users')
  //     console.log(data)
  //     setUsers(data)
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  // useEffect(() => {
  //   getUsers()
  // }, [])


  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}

      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content className="--radix-select-content-available-width">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users && users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssigneeSelect;
