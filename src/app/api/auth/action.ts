"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { useUserData } from "@/app/hooks/useUserData";

export async function login(formData: FormData) {
  const supabase = createServerActionClient({ cookies });

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return { success: false };
    }

    // Session is automatically handled by Supabase
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error during login:", error);
    throw new Error("Connection error");
  }
}

export async function signup(formData: FormData) {
  const supabase = createServerActionClient({ cookies });

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        username: formData.get("username") as string,
        avatar_url: "/pfp1.svg" as string,
      },
    },
  };

  try {
    const { data: signUpData, error } = await supabase.auth.signUp(data);

    if (error) {
      console.log(error);
      return { success: false, error: error.message };
    }

    // If user is created successfully, add data to user table
    if (signUpData.user) {
      const { data: insertData, error: insertError } = await supabase
        .from("user")
        .insert([
          {
            user_name: data.options.data.username,
            user_email: data.email,
            user_avatar: data.options.data.avatar_url,
          },
        ])
        .select();
      console.log(insertData);
      if (insertError) {
        console.error("Error inserting user data:", insertError);
        return { success: false, error: "Failed to create user profile" };
      }
    }

    // Check if user is created but needs email confirmation
    if (signUpData.user && !signUpData.session) {
      return {
        success: true,
        message: "Please check your email to confirm your account.",
      };
    }

    // If session exists, user is signed up and logged in
    if (signUpData.session) {
      revalidatePath("/", "layout");
      return { success: true };
    }

    return {
      success: false,
      error: "An unexpected error occurred during signup.",
    };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return { success: false, error: "Connection error" };
  }
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    redirect("/error");
  }

  // Clear localStorage
  if (typeof window !== "undefined") {
    localStorage.clear();
  }

  revalidatePath("/", "layout");
  redirect("/");
}
