import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GET_USER_SINGLE, GET_USERS, UPDATE_USER_SINGLE } from "../graphqlQueries";
import { useMutation, useQuery } from "@apollo/client";
import { UsersInsertInput, UsersSelectItem } from "@/__generated__/graphql";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export function UpdateUser({ userID }: { userID: number }) {

  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_USER_SINGLE, {
    variables: {
      where: {
        id: {
          eq: userID,
        },
      },
    },
  });

  function extractUser(data?: UsersInsertInput) {
    return {
      id: data?.id ?? '',
      email: data?.email ?? '',
      username: data?.username ?? ''
    } as UsersInsertInput
  }

  const {
    register,
    handleSubmit,
    reset
  } = useForm<UsersInsertInput>();

  useEffect(() => {
    if (data?.usersSingle) {
      reset(extractUser(data.usersSingle));
    }
  }, [data, reset]);

  const [updateUser] = useMutation(UPDATE_USER_SINGLE, {
    onCompleted: () => {
      alert("updated")
      console.log("user created successfully");
    },
    onError: () => {
      console.log("cannot add user");
    },
    update(cache, { data }) {
      const existingData = cache.readQuery({ query: GET_USERS })
      if (data?.updateUserSingle) {
        const currentUser = { ...data.updateUserSingle }
        const updatedUsers = existingData?.users.map((user) => {
          if (user?.id === currentUser.id) {
            return { id: currentUser.id, email: currentUser.email, username: currentUser.username, __typename: user.__typename }
          }
          return user
        })
        cache.writeQuery({
          query: GET_USERS,
          data: { users: updatedUsers as unknown as UsersSelectItem[] },
        });
      }
    },
  });

  const onSubmit: SubmitHandler<UsersInsertInput> = (
    userData: UsersInsertInput,
  ) => {
    updateUser({
      variables: {
        input: { ...userData, id: data?.usersSingle?.id! }
      }
    })
    setOpen(false);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4" />
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to user profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                {...register("username")}
                id="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                email
              </Label>
              <Input
                {...register("email")}
                id="email"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
