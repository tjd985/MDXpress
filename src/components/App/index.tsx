import { Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";

import Home from "../Home";
import Header from "../Header";
import Description from "../shared/Description";

function App() {
  return (
    <>
      <Main>
        <Header />
        <Routes>
          <Route path="/id/:id/version/:version" element={<Home />} />
          <Route
            path="/"
            element={<Navigate to="/id/:id/version/:version" />}
          />
        </Routes>
      </Main>
      <MobileNotification>
        <Description
          className="mobile-notification"
          text="MDXpress does not support mobile experiences. 😢\n
          Please connect via PC or Tablet"
        />
      </MobileNotification>
    </>
  );
}

const Main = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const MobileNotification = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  display: none;
`;

export default App;
