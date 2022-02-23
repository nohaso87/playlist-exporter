import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  routes,
  route,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

//Styling
import {
  PageTitle,
  PageSpan,
  AppStatus,
  FormSelect,
  FormSubmit,
  TrackList,
  PageBase,
  TrackPill,
  TrackArtist,
  TrackTitle,
  StatusBar,
  TrackTotal,
  ExportCSV,
  LinkCSV,
  TrackStats,
  TrackNumber,
  RefreshBtn,
  RefreshBtnRi,
  LoginBtn,
  UserInput,
} from "./Style";
import { RiWindowsFill } from "react-icons/ri";

function App() {
  const [options, setOptions] = useState([]);
  const [musiclist, setMusiclist] = useState([]);
  const [status, setStatus] = useState("Offline...");
  const [listid, setListid] = useState("Select Playlist");
  const [total, setTotal] = useState(0);
  const [csvdata, setCsvdata] = useState([]);
  const [csvobj, setCsvobj] = useState([]);
  const [track, setTrack] = useState("No Title to be displayed");
  const [userid, setUserid] = useState();
  const [loginStatus, setLoginStatus] = useState("Connect");
  const [disabled, setDisabled] = useState(true);

  const [loginpage, setLoginpage] = useState("");

  const selectElement = useRef();

  //This function redirects to obtain code for authentication
  const login = () => {
    window.location.href = "https://playlist-exporter.herokuapp.com/";
  };

  //This authenticates the user
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("code");
    if (!id) {
    } else {
      axios
        .get("https://playlist-exporter.herokuapp.com/token", {
          params: { code: id },
        })
        .then((response) => {
          if (response.data == "wrong code") {
            window.location.href = "http://localhost:3000";
          } else {
            const rawToken = response.data.split("&")[0];
            const token = rawToken.split("=")[1];
            setStatus("Connecting...");
            setLoginStatus("...");
            axios
              .get("https://playlist-exporter.herokuapp.com/getUser", {
                params: { token },
              })
              .then((response) => {
                const { id, name } = response.data;
                setUserid(response.data.id);
                setLoginStatus("Hi, " + name);
              })
              .catch((error) => console.error(error));
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  //This section loads the playlist based on the credentials from the authentication
  (() => {
    if (userid) {
      axios
        .get("https://playlist-exporter.herokuapp.com/playlist", {
          params: { userid },
        })
        .then((response) => {
          const playList = response.data.data;
          setOptions(playList);
          setStatus("Ready");
          setDisabled(false);
        })
        .catch((error) => console.error(error));
    } else {
    }
  })(userid);

  //This function loads tracks upon clicking the Fetch Title function
  const loadTracks = (e) => {
    e.preventDefault();
    const listID = listid;
    if (listID == "Select Playlist") {
      alert("You must select a playlist first.");
    } else {
      setMusiclist([]);
      setTrack("Loading Tracks...");
      axios
        .get("https://playlist-exporter.herokuapp.com/trk", {
          params: { list: listID },
        })
        .then((response) => {
          const trackList = response.data.data;
          setTotal(response.data.total);
          setMusiclist(trackList);
          setCsvdata(trackList);
        })
        .catch((error) => console.error(error));
    }
  };

  //This lists out the contents of the playlist
  const trackPill = musiclist.map((x) => (
    <TrackPill key={x.id}>
      <TrackTitle>{x.title}</TrackTitle>;
      <TrackArtist>{x.artist.name}</TrackArtist>;
      <TrackArtist>{x.album.title}</TrackArtist>
    </TrackPill>
  ));

  //This formats the data to be downloaded to CSV
  const filteredCsv = (event) => {
    const arrayTitle = ["title;artist;album"];
    const newObject = csvdata.map((items) => [
      items.title + ";" + items.artist.name + ";" + items.album.title,
    ]);
    setCsvobj([arrayTitle, ...newObject]);
  };

  //This is to refresh the states
  const refreshPill = () => {
    setMusiclist([]);
    setTotal(0);
    setListid("Select Playlist");
    setTrack("No Title to be displayed");
    selectElement.current.value = "Select Playlist";
  };

  return (
    <Router>
      <PageBase>
        <PageTitle>Playlist Exporter</PageTitle>
        <PageSpan>(Deezer)</PageSpan>
        <br />
        <br />
        <LoginBtn onClick={login}>{loginStatus}</LoginBtn>
        <StatusBar>
          Status: <AppStatus stats={status}>&nbsp; {status}</AppStatus>
        </StatusBar>
        <form>
          {/* <UserInput
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          placeholder="Please enter your User ID"
        ></UserInput>
        <br /> */}
          <FormSelect
            ref={selectElement}
            onChange={(e) => setListid(e.target.value)}
          >
            <option value="Select Playlist">Select Playlist</option>
            {options.map((x) => (
              <option value={x.id} key={x.id} data={x.title}>
                {x.title}
              </option>
            ))}
          </FormSelect>

          <FormSubmit onClick={loadTracks} disabled={disabled}>
            Fetch Titles
          </FormSubmit>
          <RefreshBtn onClick={refreshPill}>
            <RefreshBtnRi></RefreshBtnRi>
          </RefreshBtn>
        </form>
        <TrackTotal>
          <TrackNumber pill={trackPill}>{total}</TrackNumber> Tracks listed.
        </TrackTotal>
        <TrackStats pill={trackPill}>{track}</TrackStats>
        <TrackList>{trackPill}</TrackList>
        <ExportCSV onClick={filteredCsv} pill={trackPill}>
          {<LinkCSV data={csvobj}>Export CSV</LinkCSV>}
        </ExportCSV>
      </PageBase>
    </Router>
  );
}

export default App;
