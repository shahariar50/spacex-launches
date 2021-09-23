import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import SingleListButton from "./components/common/buttton/SingleListButton";
import LaunchItemCard from "./components/common/card/LaunchItemCard";
import Header from "./components/common/header/Header";
import { loadLaunches } from "./store/reducer/launchesReducer";

const mapStateToProps = ({ launches }) => ({ launches });

function App({ launches, dispatch }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [filterDateRange, setFilterDateRange] = React.useState("all");
  const [filterBySuccess, setFilterBySuccess] = React.useState("both");
  const [filterIfUpcoming, setFilterIfUpcoming] = React.useState(false);

  // Fetech Launches on first load
  React.useEffect(() => {
    dispatch({ type: loadLaunches });
  }, [dispatch]);

  // Set search input value to state
  const handleSearch = ({ target }) => {
    setSearchValue(target.value);
  };

  // Filter launches data by week, month, year
  const filterByDate = (data) => {
    //Filter by week
    if (filterDateRange === "week") {
      const date = new Date();
      const lastWeek = moment(date).subtract(7, "d");

      return data.filter((item) =>
        moment(item.launch_date_utc).isBetween(lastWeek, date)
      );
    }

    // Filter by month
    if (filterDateRange === "month") {
      const date = new Date();
      const lastMonth = moment(date).subtract(1, "m");

      return data.filter((item) =>
        moment(item.launch_date_utc).isBetween(lastMonth, date)
      );
    }

    // Filter by year
    if (filterDateRange === "year") {
      const date = new Date();
      const lastYear = moment(date).subtract(1, "y");

      return data.filter((item) =>
        moment(item.launch_date_utc).isBetween(lastYear, date)
      );
    }

    return data;
  };

  // Filter launches data by success
  const handleFilterBySuccss = (data) => {
    // Filter by sucess
    if (filterBySuccess === "success") {
      return data.filter((item) => item.launch_success);
    }

    // Filter by failiure
    if (filterBySuccess === "failed") {
      return data.filter((item) => !item.launch_success);
    }

    return data;
  };

  // Root function to trigger all filter function
  const filterData = () => {
    // Filtering by search value
    let filteredValue = launches?.data?.filter((item) =>
      item.rocket.rocket_name
        .replace(/ /g, "")
        .toLowerCase()
        .includes(searchValue.replace(/ /g, "").toLowerCase())
    );

    filteredValue = filterByDate(filteredValue);
    filteredValue = handleFilterBySuccss(filteredValue);

    // Filter upcoming
    if (filterIfUpcoming) {
      filteredValue = filteredValue.filter((item) => item.upcoming);
    }

    return filteredValue;
  };

  return (
    <div className="App">
      <Header />
      <div className="pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <h5>Filter by date</h5>
                <ul className="list-group">
                  <SingleListButton
                    onClick={() => setFilterDateRange("all")}
                    isctive={filterDateRange === "all"}
                  >
                    All
                  </SingleListButton>
                  <SingleListButton
                    onClick={() => setFilterDateRange("week")}
                    isctive={filterDateRange === "week"}
                  >
                    Last Week
                  </SingleListButton>
                  <SingleListButton
                    onClick={() => setFilterDateRange("month")}
                    isctive={filterDateRange === "month"}
                  >
                    Last Month
                  </SingleListButton>
                  <SingleListButton
                    onClick={() => setFilterDateRange("year")}
                    isctive={filterDateRange === "year"}
                  >
                    Last Year
                  </SingleListButton>
                </ul>
              </div>
              <div className="mb-3">
                <h5>Filter by success</h5>
                <ul className="list-group">
                  <SingleListButton
                    onClick={() => setFilterBySuccess("both")}
                    isctive={filterBySuccess === "both"}
                  >
                    Both
                  </SingleListButton>
                  <SingleListButton
                    onClick={() => setFilterBySuccess("success")}
                    isctive={filterBySuccess === "success"}
                  >
                    Success
                  </SingleListButton>
                  <SingleListButton
                    onClick={() => setFilterBySuccess("failed")}
                    isctive={filterBySuccess === "failed"}
                  >
                    Failure
                  </SingleListButton>
                </ul>
              </div>
              <div className="mb-3 mb-md-0">
                <h5>Is upcoming?</h5>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={({ target }) => setFilterIfUpcoming(target.checked)}
                  checked={filterIfUpcoming}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="row jusitfy-content-between align-items-center mb-4">
                <div className="col-12">
                  <input
                    type="text"
                    value={searchValue}
                    className="form-control form-control-lg"
                    placeholder="search launches by rocket name...."
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className=" row align-items-stretch">
                {filterData().length > 0
                  ? filterData().map((item) => (
                      <div
                        className="col-lg-6 mb-4"
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
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
