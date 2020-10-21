import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    const {
      name: { first, last },
      location: { city, street, postcode },
      picture,
      cell,
    } = row.original;
    return (
      <Card className="cardContainer">
        <div>
          <CardImg top src={picture.large} alt='Card image cap' />
        </div>
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`}</strong>
          </CardTitle>
          <CardText>
            <strong>Created on:</strong> 10.02.2020 <br />
            <strong>Last Updated:</strong> 11.02.2020 <br />
            <strong>Closed on:</strong> 19.02.2020 <br />
            <strong>Created By:</strong> Thomas Cliff <br />
            <strong>Processed by:</strong> Kiril Dimitrov <br />
            {`${street.name} ${street.number} - ${postcode} - ${city}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '⇩' : '⇨'}
          </span>
        ),
      },
      {
        Header: 'ID',
        accessor: 'registered.age',
      },
      {
        Header: 'First Name',
        accessor: 'name.first',
      },
      {
        Header: 'Last Name',
        accessor: 'name.last',
      },
      {
        Header: 'Created on',
        accessor: 'registered.date',
      },
      {
        Header: 'Last update',
        accessor: 'phone',
      },
      {
        Header: 'Closed on',
        accessor: 'cell',
      },
      {
        Header: 'Processed by',
        accessor: 'id.value',
      },
      {
        Header: 'Details',
        accessor: 'location.city',
      },
      {
        Header: 'Status',
        accessor: (values) => {
          const { latitude, longitude } = values.location.coordinates;
          const first = Number(latitude) > 0 ? 'N' : 'S';
          const second = Number(longitude) > 0 ? 'E' : 'W';
          return first + '/' + second;
        },
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
        Cell: ({ cell }) => {
          const { value } = cell;

          const pickEmoji = (value) => {
            let first = value[0]; // N or S
            let second = value[2]; // E or W
            const options = ['In progress', 'New', 'Done', 'Done'];
            let num = first === 'N' ? 0 : 2;
            num = second === 'E' ? num + 1 : num;
            return options[num];
          };

          return (
            <div className={pickEmoji(value).replace(' ', '')} style={{ textAlign: 'center', fontSize: 14 }}>
              {pickEmoji(value)}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="tableCointainer">
      <div>
        <a href="/newform">Create New</a>
      </div>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  );
};

export default Home;