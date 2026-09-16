"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/api";
import "./profile.css";

type User = {
  username: string;
  email: string;
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
          method: "GET",
          credentials: "include", 
        });

        if (!res.ok) {
            router.push("/login");
            return;
          }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="profileBody">
      <h2>Profile</h2>
      {loading && <p>Loading profile...</p>}
      {!loading && error && <p className="profileError">{error}</p>}
      {!loading && !error && (
        <div className="profileCard">
          {user ? (
            <>
              <div className="profileRow">
                <span className="profileLabel">Username</span>
                <span className="profileValue">{user.username}</span>
              </div>
              <div className="profileRow">
                <span className="profileLabel">Email</span>
                <span className="profileValue">{user.email}</span>
              </div>
            </>
          ) : (
            <p>No user data found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
