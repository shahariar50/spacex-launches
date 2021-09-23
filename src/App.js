import React from "react";
import { connect } from "react-redux";
import LaunchItemCard from "./components/common/card/LaunchItemCard";
import Header from "./components/common/header/Header";
import { loadLaunches } from "./store/reducer/launchesReducer";

const mapStateToProps = ({ launches }) => ({ launches });

function App({ launches, dispatch }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");

  React.useEffect(() => {
    dispatch({ type: loadLaunches });
  }, [dispatch]);

  const handleSearch = ({ target }) => {
    setSearchValue(target.value);

    setFilterValue("");
  };

  const filterData = () => {
    const filterSearch = launches?.data?.filter((item) =>
      item.rocket.rocket_name
        .replace(/ /g, "")
        .toLowerCase()
        .includes(searchValue.replace(/ /g, "").toLowerCase())
    );

    return filterSearch;
  };

  return (
    <div className="App">
      <Header />
      <div className="pt-4 pb-4">
        <div className="container">
          <div className="row jusitfy-content-between mb-4">
            <div className="col-sm-4">
              <input
                type="text"
                value={searchValue}
                className="form-control form-control-lg"
                placeholder="search launches by rocket name...."
                onChange={handleSearch}
              />
            </div>
            <div className="col"></div>
          </div>
          <div className=" row align-items-stretch">
            {filterData().length > 0
              ? filterData().map((item) => (
                  <div
                    class="col-md-4 mb-4"
                    key={`${item.launch_date_unix}${item.flight_number}`}
                  >
                    <LaunchItemCard data={item} />
                  </div>
                ))
              : "Not enough lunches to show..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
