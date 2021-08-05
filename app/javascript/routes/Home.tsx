import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { apiFetchRequested } from 'store/actions';
import { Channel, State } from 'store/reducers';
import React from 'react';
import { Badge, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row, Spinner } from 'reactstrap';
import moment from 'moment'

const Home: FC = () => {
  const channels = useSelector((state: State) => state.channels, _.isEqual);
  const dataPoints = useSelector((state: State) => state.dataPoints, _.isEqual);
  const devices = useSelector((state: State) => state.devices, _.isEqual);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setinterval can be used to minimize server side request in the future and to be called at every specific interval
    dispatch(apiFetchRequested('devices'));
    dispatch(apiFetchRequested('channels'));
    dispatch(apiFetchRequested('data_points'));
    setIsLoading(false);
  }, []);

  const renderLineChart = (channel: Channel) => {
    const result = _.values(_.filter(dataPoints, { channelId: channel.id }));
    return (
      <Fragment key={`channel-${channel.id}`}>
        <LineChart
          data={result}
          height={400}
          width={500}
        >
          <Line type="monotone" stroke="#8884d8" dataKey="value" />
          <CartesianGrid />
          <XAxis  dataKey="createdAt" tickFormatter={formatXAxis} />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />}  /> */}
          </LineChart>
      </Fragment>
    )
  }

  function formatXAxis(tickItem:any) {
    return moment(tickItem).format('MMM Do YY')
    }

  const renderCard = () => {
    return (
      isLoading ? <Spinner type="grow" color="primary" /> : <Row md="2">
        {_.flatMap(devices, (device) =>
          _.map(_.filter(channels, { deviceId: device.id }), (channel) =>
            <Col key={`device-${device.id}-channel-${channel.id}`}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Device ID - {device.id}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{channel.name}</CardSubtitle>
                  {channel ? renderLineChart(channel) : <Spinner type="grow" color="primary" />}
                </CardBody>
              </Card>
            </Col>
          )
        )}
      </Row>
    )
  }

  return (
    <Fragment>
      <Container>
        <h1>Dashboard<Badge color="primary"></Badge></h1>
        {renderCard()}
      </Container>
    </Fragment>
  );
};

export default Home;
