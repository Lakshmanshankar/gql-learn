import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { UsersInsertInput } from "@/__generated__/graphql";

const CREATE_USER = gql(/* GraphQL */ `
  mutation createUser($values: UsersInsertInput!) {
    insertIntoUsersSingle(values: $values) {
      id
    }
  }
`);

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersInsertInput>();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      alert("User added successfully");
    },
    onError: () => {
      console.log("cannot add user");
    },
  });

  const onSubmit: SubmitHandler<UsersInsertInput> = (
    data: UsersInsertInput,
  ) => {
    createUser({
      variables: {
        values: data,
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-[400px] p-4 border border-slate-200 rounded-md"
      >
        <div className="flex flex-col">
          <label className="text-lg text-slate-500">username</label>
          <input
            defaultValue="pichu"
            {...register("username")}
            className="border border-slate-300 rounded-md min-h-10 p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg text-slate-500">email</label>
          <input
            {...register("email", { required: true })}
            className="border border-slate-300 rounded-md min-h-10 p-1"
          />
        </div>
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}
        <input type="submit" className="bg-slate-100 py-3 rounded-md" />
      </form>
    </>
  );
}
