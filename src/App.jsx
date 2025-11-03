import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  About,
  Advisors,
  Careers,
  ComingSoon,
  ContactPage,
  CorporateGovernance,
  Home,
  HowToInvest,
  Leadership,
  PageNotFound,
  Sustainability,
} from "./pages";
import GeneralLayout from "./layouts/GeneralLayout";
import Solution from "./pages/Solution";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GeneralLayout>
              <Home />
            </GeneralLayout>
          }
        />

        {/* Solutions Page */}
        <Route
          path="solutions/investmentBanking"
          element={
            <GeneralLayout>
              <Solution />
            </GeneralLayout>
          }
        />
        <Route
          path="solutions/investmentManagement"
          element={
            <GeneralLayout>
              <Solution />
            </GeneralLayout>
          }
        />
        <Route
          path="solutions/securitiesTrading"
          element={
            <GeneralLayout>
              <Solution />
            </GeneralLayout>
          }
        />
        {/* End of Solutions Page */}

        {/* Insights page */}
        <Route
          path="insights"
          element={
            <GeneralLayout>
              <Insights />
            </GeneralLayout>
          }
        />
        {/* End of Insights page */}

        {/* Careers Page */}
        <Route
          path="/careers"
          element={
            <GeneralLayout>
              <Careers />
            </GeneralLayout>
          }
        />
        {/* End of careers Page */}

        {/* Contact Page */}
        <Route
          path="/contact"
          element={
            <GeneralLayout>
              <ContactPage />
            </GeneralLayout>
          }
        />
        {/* End of careers Page */}

        {/* About Page */}
        <Route
          path="/about"
          element={
            <GeneralLayout>
              <About />
            </GeneralLayout>
          }
        />
        {/* End of About Page */}

        {/* About Page/leadership*/}
        <Route
          path="/about/leadership"
          element={
            <GeneralLayout>
              <Leadership />
            </GeneralLayout>
          }
        />
        {/* End of About Page/leadership */}

        {/* About Page/sustainability*/}
        <Route
          path="/about/sustainability"
          element={
            <GeneralLayout>
              <Sustainability />
            </GeneralLayout>
          }
        />
        {/* End of About Page/sustainability */}

        {/* Investment Page */}
        {/* About investors/howToInvest*/}
        <Route
          path="/investors/howToInvest"
          element={
            <GeneralLayout>
              <HowToInvest />
            </GeneralLayout>
          }
        />

        {/* About investors/advisors*/}
        <Route
          path="/investors/advisors"
          element={
            <GeneralLayout>
              <Advisors />
            </GeneralLayout>
          }
        />

        {/* About investors/governance*/}
        <Route
          path="/investors/governance"
          element={
            <GeneralLayout>
              <CorporateGovernance />
            </GeneralLayout>
          }
        />

        {/* About investors/reports*/}
        <Route
          path="/investors/reports"
          element={
            <GeneralLayout>
              {/* <ComingSoon
                text={
                  "Reports, presentations and the company’s announcements will be published here"
                }
                title={"Coming Soon!"}
              /> */}
              <Reports />
            </GeneralLayout>
          }
        />

        {/* Undocumented routes */}
        <Route
          path="*"
          element={
            <GeneralLayout>
              <PageNotFound />
            </GeneralLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
