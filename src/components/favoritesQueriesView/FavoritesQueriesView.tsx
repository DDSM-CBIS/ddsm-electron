import React, { useEffect } from 'react';
import { Box, Button, Collapse, ListItemText, Typography } from '@mui/material';
import { ArrowBack, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CHANNELS } from '../../constants/common';
import { ListItemButtonStyled, ListStyled, TitleStyled } from './style';

const { DDSM_AGENT } = window;

export default function FavoritesQueriesView() {
  const [queries, setQueries] = React.useState([]);
  const [open, setOpen] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getQueries = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.LOAD_QUERIES);
      console.log(response);
      setQueries(response);
      setOpen(
        response.reduce((acc, query) => {
          acc[query?.query] = false;
          return acc;
        }, {})
      );
    };

    getQueries();
  }, []);

  const goToHome = () => {
    navigate(`/`);
  };

  const handleClick = (queryName: string) => {
    setOpen(
      Object.keys(open).reduce((acc, key) => {
        acc[key] = key === queryName ? !open[key] : false;
        return acc;
      }, {})
    );
  };

  const handleDelete = async (queryName: string) => {
    await DDSM_AGENT.send(CHANNELS.DELETE_QUERY, queryName);
  };

  const handleApply = async (query) => {
    navigate(`/`, {
      state: {
        filters: query.filters,
      },
    });
  };

  return (
    <Box>
      <Button size="medium" onClick={goToHome}>
        <ArrowBack />
        Back
      </Button>
      <TitleStyled variant="h5">Favorites Queries View</TitleStyled>
      <ListStyled aria-labelledby="nested-list-subheader">
        {queries.map((query) => (
          <>
            <ListItemButtonStyled key={query?.query} onClick={() => handleClick(query?.query)}>
              <ListItemText primary={query?.query} />
              {open[query?.query] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButtonStyled>
            <Collapse in={open[query?.query]} timeout="auto" unmountOnExit>
              {query?.filters?.filterOptions && Object.keys(query?.filters?.filterOptions).length > 0 && (
                <>
                  <Typography variant="h6">Filter Options</Typography>
                  {Object.keys(query?.filters?.filterOptions).map((key) => (
                    <Typography variant="body2" key={key}>
                      {key}: {JSON.stringify(query?.filters?.filterOptions[key])}
                    </Typography>
                  ))}
                </>
              )}
              {query?.filters?.abnormalityFilter && Object.keys(query?.filters?.abnormalityFilter).length > 0 && (
                <>
                  <Typography variant="h6">Abnormality Filter</Typography>
                  {Object.keys(query?.filters?.abnormalityFilter).map((key) => (
                    <Typography variant="body2" key={key}>
                      {key}: {JSON.stringify(query?.filters?.abnormalityFilter[key])}
                    </Typography>
                  ))}
                </>
              )}
              {query?.filters?.patientIds && Object.keys(query?.filters?.patientIds).length > 0 && (
                <>
                  <Typography variant="h6">Patient Ids</Typography>
                  {Object.keys(query?.filters?.patientIds).map((key) => (
                    <Typography variant="body2" key={key}>
                      {JSON.stringify(query?.filters?.patientIds[key])}
                    </Typography>
                  ))}
                </>
              )}
              <Button variant="contained" onClick={() => handleDelete(query.query)}>
                Delete
              </Button>
              <Button variant="contained" onClick={() => handleApply(query)}>
                Apply
              </Button>
            </Collapse>
          </>
        ))}
      </ListStyled>
    </Box>
  );
}
