import { useState } from "react";
import { useMutation } from "convex/react";
import type { FunctionReference } from "@/node_modules/convex/src/server";

interface ApiMutationReturnType<T extends FunctionReference<"mutation">> {
  pending: boolean;
  mutate: (payload: T["_args"]) => Promise<T["_returnType"] | void>;
}

/**
 * @description A hook to use a mutation from the API
 * @params mutation
 */
export function useApiMutation<Mutation extends FunctionReference<"mutation">>(
  mutation: Mutation,
): ApiMutationReturnType<Mutation> {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutation);
  const mutate = async (payload: Mutation["_args"]) => {
    setPending(true);
    return await apiMutation(payload)
      .catch((error: any) => {
        throw error;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
}
