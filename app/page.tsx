import { incrementViews } from "@/actions";


export default async function Home() {
  await incrementViews("Rajat23");
  return <div className="">Hi, I am Rajat</div>;
}
