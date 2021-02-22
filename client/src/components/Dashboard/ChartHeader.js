import React, { useState, useEffect } from "react";

import date from "date-and-time";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import FA from "react-fontawesome";

const ChartHeader = (props) => {
  const {
    title,
    fetchChartData,
    loading,
    format,
    now,
    hideFilters,
    isEmptyInitFunction,
  } = props;

  useEffect(() => {
    callDataFetcher();
  }, []);

  const callDataFetcher = () => {
    if (isEmptyInitFunction) {
      fetchChartData();
    } else {
      // Selecting last 31 days (Month) at initial stage
      fetchChartData({
        startDate: date.format(date.addDays(now, -31), format),
        endDate: date.format(now, format),
      });
    }
  };

  return (
    <>
      <span
        style={{
          fontSize: "16px",
          fontWeight: 600,
          paddingLeft: "10px",
        }}
      >
        {title}
        {/* {loading ?? (
          <span style={{ paddingLeft: "10px" }}>
            <Spinner animation="border" size="sm"></Spinner>
          </span>
        )} */}
        {/* {loading ? (
          <span style={{ paddingLeft: "10px" }}>
            <Spinner animation="border" size="sm"></Spinner>
          </span>
        ) : (
          <Button
            variant="light"
            disabled={loading}
            onClick={loading ? kkkk : null}
          >
            {loading ? (
              <span style={{ paddingLeft: "10px" }}>
                <Spinner animation="border" size="sm"></Spinner>
              </span>
            ) : (
              <FA
                name="rocket"
                size="2x"
                spin
                style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
              />
            )}
          </Button>
        )} */}

        <span style={{ paddingLeft: "10px" }}>
          <Button
            variant="light"
            disabled={loading}
            onClick={!loading ? callDataFetcher : null}
          >
            {/* {loading ? (
              <Spinner animation="border" size="sm"></Spinner>
            ) : (
              <FA
                name="refresh"
                spin
                style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
              />
            )} */}

            <FA
              name="refresh"
              spin={loading}
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </Button>
        </span>
      </span>
      {!hideFilters && (
        <Dropdown
          style={{ display: "inline-block", float: "right" }}
          onSelect={(eventKey) => {
            console.log("selected eventKey:", eventKey);
            // const now = new Date();
            // const format = "YYYY-MM-DD";

            switch (eventKey) {
              case "today":
                {
                  const today = date.format(now, format);
                  // setOrdersChartPeriod()
                  console.log("Date:", today);
                  fetchChartData({ startDate: today, endDate: today });
                }
                break;
              case "yesterday":
                {
                  const yesterday = date.format(date.addDays(now, -1), format);
                  // setOrdersChartPeriod()
                  console.log("Date:", yesterday);
                  fetchChartData({ startDate: yesterday, endDate: yesterday });
                }
                break;
              case "last-7-days":
                {
                  const start = date.format(date.addDays(now, -7), format);
                  const end = date.format(now, format);
                  console.log("Date:", start, " - ", end);
                  fetchChartData({ startDate: start, endDate: end });
                }
                break;
              case "last-31-days":
                {
                  const start = date.format(date.addDays(now, -31), format);
                  const end = date.format(now, format);
                  console.log("Date:", start, " - ", end);
                  fetchChartData({ startDate: start, endDate: end });
                }
                break;
              default:
                break;
            }
          }}
        >
          <Dropdown.Toggle variant="" id="dropdown-basic">
            Select Period
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={"today"}>Today</Dropdown.Item>
            <Dropdown.Item eventKey={"yesterday"}>Yesterday</Dropdown.Item>
            <Dropdown.Item eventKey={"last-7-days"}>Last 7 Days</Dropdown.Item>
            <Dropdown.Item eventKey={"last-31-days"}>
              Last 31 Days
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default ChartHeader;
