import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}`,
    }),
    createTeam: builder.mutation({
      query: ({ email, data }) => ({
        url: `/teams`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email, data }, { queryFulfilled, dispatch }) {
        try {
          const team = await queryFulfilled;
          if (team?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTeams", email, (draft) => {
                draft.push(team.data);
              })
            );
          }
        } catch (error) {
          //do nothing
        }
      },
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamMutation } = teamsApi;
