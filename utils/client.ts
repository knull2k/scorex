import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "na7b3iu2",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: false,
  // inside sanity compiler, go to Manage project > API > Tokens > Add API Token > (Name: Development, Check Editor) > Save
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// inside sanity, Add CORS origin > set to http://localhost:3000 > Allow credentials
