import React from "react";
import { Bar } from 'react-chartjs-2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);

export class Shorts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { profile, imgProp = 'shorts_img', theme = 'light' } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} Shorts Analysis`} src={profile[imgProp].url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile[imgProp].url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
      );
    }

    if (!profile || !profile.numbers || !profile.numbers.short_pct_float_ts) return null;
    if (!profile || !profile.numbers || !profile.numbers.shares_short_ts) return null;
    const short_pct_float_ts = profile.numbers.short_pct_float_ts || [];
    const shares_short_ts = profile.numbers.shares_short_ts || [];
    const short_pct_float = short_pct_float_ts.map(d => d.v);
    const shares_short = shares_short_ts.map(d => d.v);
     
    const gridColor = theme === 'light' ? 'rgba(80, 80, 80, 0.1)' : 'rgba(255, 255, 255, 0.2)';
    const fontColor = theme === 'light' ? '#444444' : '#dddddd';

    const data = {
      labels: short_pct_float_ts.map(d => dayjs(d.ts).format('YYYYMM')),
      // labels: short_pct_float_ts.map(d => dayjs.utc(d.ts).format('YYYYMM')),
      datasets: [{
        yAxisID: '1',
        type: 'line',
        fill: false,
        backgroundColor: 'crimson',
        borderColor: 'crimson',
        lineTension: 0.3,
        pointBackgroundColor: 'white',
        borderWidth: 1.5,
        pointRadius: 3,
        pointHoverRadius: 2,
        data: short_pct_float,
        label: 'Short Percent Float'
      }, {
        yAxisID: '2',
        type: 'bar',
        fill: false,
        backgroundColor: 'darkgray',
        borderColor: 'darkgray',
        lineTension: 0.3,
        pointBackgroundColor: 'white',
        borderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 5,
        data: shares_short,
        label: 'Shares Short'
      }]
    };
    const options = {
      legend: {
        labels: {
          fontSize: 12,
          fontColor,
          boxWidth: 10,
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 12,
            fontColor,
          },
          gridLines: {
            color: gridColor
          },
          barPercentage: 0.4
        }],
        yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: '1',
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                },
                ticks: {
                  maxTicksLimit: 6,
                  stepSize: 0.1,
                  fontSize: 12,
                  fontColor,
                },
              },
              {
                type: 'linear',
                display: true,
                position: 'right',
                id: '2',
                labels: {
                  show: true
                },
                gridLines: {
                  color: gridColor
                },
                ticks: {
                  fontSize: 12,
                  fontColor,
                },
              }]
      },
    };

    return (
      <div style={{ width: '100%', padding: 5, fontSize: 12 }}>
        <div className={`theme-darkred-${theme}`} style={{ fontWeight: 'bold' }}>{profile.ticker} - {profile.name}&nbsp;&nbsp;<span className={`theme-green-${theme}`}>Short Analysis</span></div>
        <Bar data={data} height={180} options={options} />
        <div style={{ fontSize: 12, padding: 5, paddingTop: 2 }}>Crafted by <a href='https://twitter.com/tradeideashq' target='_blank' className={`theme-darkred-${theme}`}>@tradeideashq</a> with <span style={{ fontSize: 16, color: 'red' }}>💡</span></div>
      </div>
    );
  }
}

export default Shorts;
