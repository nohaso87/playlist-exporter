import styled from "styled-components";
import { CSVLink } from "react-csv";
import { RiRefreshFill } from "react-icons/ri";

export const PageBase = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 0 0 50px 0;

  @media screen and (max-width: 1000px) {
    width: 95%;
    background-color: #f9f9f9;
  }
`;

export const LoginBtn = styled.p`
  position: relative;
  text-align: center;
  margin: 20px 0;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  cursor: pointer;
`;

export const PageTitle = styled.h1`
  position: relative;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 0;
`;

export const PageSpan = styled.span`
  margin-top: 0;
  font-family: "Montserrat", sans-serif;
`;

export const StatusBar = styled.p`
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  width: 465px;
  margin: 10px auto;

  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 5px 0;
  }
`;

export const AppStatus = styled.span`
  color: ${(props) => (props.stats == "Ready" ? "Green" : "Red")};
  font-family: "Montserrat", sans-serif;
`;

export const TrackNumber = styled.span`
  font-weight: ${(props) => (props.pill != "" ? "bold" : "")};
`;

export const UserInput = styled.input`
  display: inline-block;
  width: 470px;
  border: none;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 10px 10px 0;
  transition: all 0.35s ease;
  outline: none;
`;

export const FormSelect = styled.select`
  width: 339px;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  padding: 10px;
  transition: all 0.35s ease;
  outline: none;

  @media screen and (max-width: 1000px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

export const FormSubmit = styled.button`
  display: inline-block;
  background: transparent;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  padding: 10px;
  margin-left: 10px;
  outline: none;
  cursor: ${(props) => (props.disabled == true ? "arrow" : "pointer")};
`;
export const TrackList = styled.div`
  width: 100%;
`;

export const TrackPill = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #f9f9f9;
  margin: 10px auto;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;

  @media screen and (max-width: 1000px) {
    font-size: 0.8em;
    text-align: left;
  }
`;

export const TrackArtist = styled.div``;

export const TrackTitle = styled.div``;

export const TrackTotal = styled.span`
  display: inline-block;
  font-family: "Montserrat", sans-serif;
  padding: 20px 0;
`;

export const TrackStats = styled.div`
  display: ${(props) => (props.pill != "" ? "none" : "flex")};
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
  color: grey;
  font-family: "Montserrat", sans-serif;
`;

export const ExportCSV = styled.div`
  display: ${(props) => (props.pill != "" ? "inline-block" : "none")};
  cursor: pointer;
  border-radius: 5px;
  background-color: #007bff;
  padding: 10px 20px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  margin-top: 30px;
  text-decoration: none;
`;

export const LinkCSV = styled(CSVLink)`
  text-decoration: none;
  color: #fff;
`;

export const RefreshBtn = styled.span`
  position: relative;
  padding: 2px 10px;
  cursor: pointer;
`;

export const RefreshBtnRi = styled(RiRefreshFill)`
  position: absolute;
  top: 0;
  font-size: 1.5em;
  display: inline-block;
`;
