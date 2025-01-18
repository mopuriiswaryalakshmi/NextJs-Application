import { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';

// Define types for profile
interface Profile {
  name: string;
  theme_color: string;
  public: boolean;
}

interface ProfileProps {
  profile: Profile;
}

const Profile = ({ profile }: ProfileProps) => {
  // State to manage profile data
  const [userProfile, setUserProfile] = useState<Profile>(profile);

  // Update userProfile if the profile prop changes
  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  return (
    <div style={{ backgroundColor: userProfile.theme_color }}>
      <h1>{userProfile.name}</h1>
      <p>{userProfile.public ? 'Profile is public' : 'Profile is private'}</p>
    </div>
  );
};

// Fetch profile data server-side using Supabase
export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  // Fetch profile from Supabase
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', params.id) // Get the profile for the given user ID
    .single();

  // If there's an error, return a 404 response
  if (error) {
    return { notFound: true };
  }

  // Return the fetched profile data as props
  return { props: { profile } };
};

export default Profile;
