import Navigation from "@/components/Navigation/Navigation";
import PageContainer from "@/components/Containers/PageContainer";
import TripsList from "@/components/TripsList/TripsList";
import TripForm from "@/components/TripForm/TripForm";
import { TripsContextProvider } from "@/context/TripContext";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Home() { 
  return (
    <>
      <AuthContextProvider>
        <Navigation />
        <TripsContextProvider>
          <PageContainer>
            <TripsList />
            <TripForm />
          </PageContainer>
        </TripsContextProvider>
      </AuthContextProvider>
    </>
  );
}
