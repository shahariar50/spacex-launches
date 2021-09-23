import React from "react";
import { connect } from "react-redux";
import LaunchItemCard from "./components/common/card/LaunchItemCard";
import Header from "./components/common/header/Header";
import { loadLaunches } from "./store/reducer/launchesReducer";

const mapStateToProps = ({ launches }) => ({ launches });

function App({ launches, dispatch }) {
  React.useEffect(() => {
    dispatch({ type: loadLaunches });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="pt-4 pb-4">
        <div className="container">
          <div className="row jusitfy-content-between">
            <div className="col-sm-4"></div>
            <div className="col-sm-6"></div>
          </div>
          <div className=" row align-items-stretch">
            {launches?.data?.map((item) => (
              <div class="col-md-4 mb-4" key={item.flight_number}>
                <LaunchItemCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
