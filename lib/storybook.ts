import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export type ShelfStatus = "want_to_read" | "reading" | "finished" | "favorite";

export async function getCurrentUser() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function getProfile(userId: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  return data;
}

export async function saveShelf(bookId: string, status: ShelfStatus, progress = 0) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Connect Supabase first.");
  const user = await getCurrentUser();
  if (!user) throw new Error("Sign in to save books.");
  const { error } = await supabase.from("shelves").upsert({ user_id: user.id, book_id: bookId, status, progress }, { onConflict: "user_id,book_id" });
  if (error) throw error;
}

export async function removeShelf(bookId: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return;
  const user = await getCurrentUser();
  if (!user) return;
  const { error } = await supabase.from("shelves").delete().eq("user_id", user.id).eq("book_id", bookId);
  if (error) throw error;
}

export async function getMyShelves() {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return [];
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase.from("shelves").select("id,book_id,status,progress,created_at,updated_at").eq("user_id", user.id).order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function publishReview(bookId: string, rating: number, body: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Connect Supabase first.");
  const user = await getCurrentUser();
  if (!user) throw new Error("Sign in to publish a review.");
  const { error } = await supabase.from("reviews").upsert({ book_id: bookId, user_id: user.id, rating, body }, { onConflict: "book_id,user_id" });
  if (error) throw error;
}

export async function toggleReviewLike(reviewId: string, liked: boolean) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Connect Supabase first.");
  const user = await getCurrentUser();
  if (!user) throw new Error("Sign in to like reviews.");
  if (liked) {
    const { error } = await supabase.from("review_likes").delete().eq("review_id", reviewId).eq("user_id", user.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("review_likes").insert({ review_id: reviewId, user_id: user.id });
    if (error) throw error;
  }
}

export async function postComment(reviewId: string, body: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Connect Supabase first.");
  const user = await getCurrentUser();
  if (!user) throw new Error("Sign in to comment.");
  const { error } = await supabase.from("comments").insert({ review_id: reviewId, user_id: user.id, body });
  if (error) throw error;
}
