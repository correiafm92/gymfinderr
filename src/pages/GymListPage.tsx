import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import GymCard from "../components/GymCard";

export default function GymListPage() {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    async function fetchGyms() {
      let { data, error } = await supabase.from("gyms").select("*");
      if (!error) setGyms(data);
    }
    
    fetchGyms();

    const subscription = supabase
      .channel("gyms")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "gyms" }, (payload) => {
        setGyms((prevGyms) => [payload.new, ...prevGyms]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Academias Cadastradas</h1>
      <div>
        {gyms.map((gym) => (
          <GymCard key={gym.id} gym={gym} />
        ))}
      </div>
    </div>
  );
}
