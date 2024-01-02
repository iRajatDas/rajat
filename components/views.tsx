import ViewCounter from "@/components/view-counter";
import { getViewsCount } from "@/lib/metrics";

export default async function Views({
  slug,
  trackView = false,
}: {
  slug: string;
  trackView?: boolean;
}) {
  let views;
  try {
    views = await getViewsCount();
  } catch (error) {
    console.error(error);
  }

  return <ViewCounter allViews={views!} slug={slug} trackView={trackView} />;
}
