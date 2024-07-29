import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/`,
  }),
  tagTypes: ["Chats", "Users","Message"],
  endpoints: (builder) => ({
    
    myChats: builder.query({
      query: () => ({
        url: "chat/me",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),

    searchUsers: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),

    addFriend: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        credentials: "include",
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Chats"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: "user/notification",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),

    createNewGroup: builder.mutation({
      query: (data) => ({
        url: "/chat/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chats"],
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) url += "?populate=true";
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chats"],
    }),

    getMessages:builder.query({
      query:({chatId,page}) => ({
          url:`/chat/message/${chatId}?page=${page}`,
          credentials:'include'
      }),
      keepUnusedDataFor:0
    }),

    sendAttachment:builder.mutation({
      query:(data)=>({
        url:'/chat/attachment',
        method:'POST',
        body:data,
        credentials:'include'
      }),
      invalidatesTags:["Message"]
    }),

    getMyGroups: builder.query({
      query:() => ({
        url:'/chat/my/groups',
        credentials:'include',
      }),
      providesTags:["Chats"]
    }),
    getMyFriends:builder.query({
      query:() => ({
        url:'/user/friends',
        credentials:'include'
      }),
      providesTags:["Users"]
    }),

    renameGroup : builder.mutation({
      query:({chatId,name}) => ({
        url:`/chat/${chatId}`,
        body:{name},
        method:'PUT',
        credentials:'include'
      }),
      invalidatesTags:['Chats']
    }),

    removeFromGroup : builder.mutation({
      query:(data) => ({
        url:'/chat/remove',
        method:'PUT',
        body:data,
        credentials:'include'
      }),
      invalidatesTags:['Chats']
    })

  }),
});

export const {
  useMyChatsQuery,
  useLazySearchUsersQuery,
  useRenameGroupMutation,
  useGetMyGroupsQuery,
  useSendFriendRequestMutation,
  useRemoveFromGroupMutation,
  useGetNotificationsQuery,
  useChatDetailsQuery,
  useAddFriendMutation,
  useCreateNewGroupMutation,
  useSendAttachmentMutation,
  useGetMessagesQuery,
  useGetMyFriendsQuery
} = api;
export default api;
