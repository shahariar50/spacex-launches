import moment from "moment";
import React from "react";

const LaunchItemCard = ({ data }) => {
  const [fullDescription, setFullDescription] = React.useState(false);

  return (
    <div
      className={`card h-100 ${
        data.upcoming
          ? ""
          : data.launch_success
          ? "border-success"
          : "border-danger"
      }`}
    >
      <div
        className={`card-header ${
          data.upcoming
            ? ""
            : data.launch_success
            ? "text-success"
            : "text-danger"
        }`}
      >
        {data.upcoming
          ? "Upcoming"
          : data.launch_success
          ? "Success"
          : "Failed"}
      </div>
      <div className="card-body">
        <h2 className="mb-3">{data.mission_name}</h2>
        <div className="mb-3">
          <p className="mb-1">
            <b>Local launch time: </b>
            {moment(data.launch_date_local).utc().format("HH:mm")}
          </p>
          <p className="mb-1">
            <b>Local launch Date: </b>
            {moment(data.launch_date_local).format("ll")}
          </p>
          <p className="mb-1">
            <b>Launch Site: </b>
            {data.launch_site.site_name}
          </p>
          {data.launch_failure_details && (
            <p className="mb-1">
              <b>Launch Failure Detail: </b>
              {data.launch_failure_details.reason}
            </p>
          )}
        </div>
        <div className="mb-4">
          <h4 className="mb-2">Rocket Details</h4>
          <p className="mb-1">
            <b>Rocket Name: </b>
            {data.rocket.rocket_name}
          </p>
          <p className="mb-1">
            <b>Rocket Type: </b>
            {data.rocket.rocket_type}
          </p>
        </div>
        {data.details && (
          <div>
            <h4 className="mb-2">Details</h4>
            <p className="mb-1">
              {data.details.length < 60 ? (
                data.details
              ) : (
                <>
                  {!fullDescription ? (
                    <>
                      {data.details.slice(0, 60)}{" "}
                      <b onClick={() => setFullDescription(true)}>More</b>
                    </>
                  ) : (
                    <>
                      {data.details}{" "}
                      <b onClick={() => setFullDescription(false)}>Less</b>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchItemCard;
