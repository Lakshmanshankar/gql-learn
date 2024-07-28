import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { TasksInsertInput, TasksSelectItem, TasksStatusEnum } from "@/__generated__/graphql";
import { GET_ALL_TASKS, GET_USERS, INSERT_TASK } from "@/Pages/graphqlQueries";
import { useToast } from "@/components/ui/use-toast";

export function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TasksInsertInput>();

  const { data } = useQuery(GET_USERS)
  const userInputOptions = data?.users;
  const { toast } = useToast()
  const [createTask] = useMutation(INSERT_TASK, {
    onCompleted: (user) => {
      console.log("user created successfully");
      toast({
        title: "Added Task successfully",
        description: `assigned to user ${user?.insertIntoTasksSingle?.userId}`,
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Added Task successfully",
        description: `assigned to user`,
      })
      console.log("cannot add user", error);
    },
    update(cache, { data }) {
      const existingData = cache.readQuery({ query: GET_ALL_TASKS })
      if (data?.insertIntoTasksSingle) {
        const newTasks = [...existingData?.tasks ?? [], data.insertIntoTasksSingle];
        cache.writeQuery({
          query: GET_ALL_TASKS,
          data: { tasks: newTasks as unknown as TasksSelectItem[] },
        });
      }
    },
  });

  const onSubmit: SubmitHandler<TasksInsertInput> = (
    data: TasksInsertInput,
  ) => {
    // data.userId = id ?? 151;
    console.log(data);

    createTask({
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
          <label className="text-lg text-slate-500">Task name</label>
          <input
            defaultValue="pichu"
            {...register("task_name")}
            className="border border-slate-300 rounded-md min-h-10 p-1"
          />
        </div>
        <div className="flex flex-col">
          <select defaultValue={TasksStatusEnum.NotStarted} {...register("status")} className="p-3 rounded-md">
            <option value={TasksStatusEnum.NotStarted}>{TasksStatusEnum.NotStarted}</option>
            <option value={TasksStatusEnum.Pending}>{TasksStatusEnum.Pending}</option>
            <option value={TasksStatusEnum.Compeleted}>{TasksStatusEnum.Compeleted}</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>assigned username</label>
          <select defaultValue={userInputOptions?.[0]?.id} {...register("userId", { valueAsNumber: true })} className="p-3 rounded-md">
            {userInputOptions?.map((user) => {
              return <option key={user.id} value={user.id}>{user.username}</option>
            })}
          </select>
        </div>
        {errors.status && (
          <span className="text-red-500">This field is required</span>
        )}
        <input type="submit" className="bg-slate-100 py-3 rounded-md" />
      </form>
    </>
  );
}
