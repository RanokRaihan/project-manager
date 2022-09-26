import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get all project
    getProjects: builder.query({
      query: (queryString) => ({
        url: `/projects?${queryString}`,
      }),
    }),
    //create a project
    createProject: builder.mutation({
      query: ({ query, data }) => ({
        url: `/projects`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ query }, { queryFulfilled, dispatch }) {
        try {
          const project = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getProjects", query, (draft) => {
              draft.push(project.data);
            })
          );
        } catch (error) {
          // do nithing
        }
      },
    }),
    updateProject: builder.mutation({
      query: ({ queryString, id, data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ queryString, data }, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", queryString, (draft) => {
            const indexOfProject = draft.findIndex((draftItem) => draftItem.id === data.id);
            draft.splice(indexOfProject, 1, data);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ queryString, id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ queryString, id }, { dispatch, queryFulfilled }) {
        //optimistic cache update after delete project
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", queryString, (draft) => {
            const indexOfProject = draft.findIndex((draftItem) => draftItem.id === id);
            draft.splice(indexOfProject, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery, useUpdateProjectMutation, useDeleteProjectMutation } =
  projectsApi;
