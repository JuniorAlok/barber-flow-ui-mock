
import { AppProviders } from "@/contexts/AppProviders";
import HomePage from "@/components/HomePage";

const LandingPage = () => {
  return (
    <AppProviders>
      <HomePage />
    </AppProviders>
  );
};

export default LandingPage;
